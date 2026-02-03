"use strict";
import { action } from "./_generated/server";
import { internal } from "./_generated/api";
import { XMLParser } from "fast-xml-parser";
import { normalizePropertyDescription } from "../lib/description-utils";
import { getRegion } from "./regions";

// Helper type for parsing properties
interface ParsedFeature {
    pool: boolean;
    poolType?: string;
    beachDistance?: number;
    hasElevator: boolean;
    hasParking: boolean;
    parkingSpaces?: number;
    hasAC: boolean;
    hasGarden: boolean;
    isGated: boolean;
    hasStorage: boolean;
    hasHeating: boolean;
    nearGolf: boolean;
    terraceSize?: number;
}

export const syncProperties = action({
    args: {},
    handler: async (ctx) => {
        console.log("Starting XML Sync...");
        const feedUrl = process.env.XML_FEED_URL;
        if (!feedUrl) {
            throw new Error("XML_FEED_URL is not defined in environment variables");
        }

        const response = await fetch(feedUrl);
        const xmlText = await response.text();

        const parser = new XMLParser({
            ignoreAttributes: false,
            attributeNamePrefix: "@_",
            isArray: (name: string) => {
                return ["property", "image", "feature", "type"].indexOf(name) !== -1;
            }
        });

        const jsonObj = parser.parse(xmlText);
        const root = jsonObj.root || jsonObj.kyero; // Adjust based on root tag, user said <property> inside? usually root>property
        // XML feed structure analysis:
        // https://www.redsp.net/trial/trial-feed-kyero.xml
        // usually <root><property>...</property></root>

        // Let's assume standard structure, if 'root' is not found check direct properties
        // Based on user desc: <property> ... <features>

        // We can try to find the array of properties
        const properties = root?.property || jsonObj.property || [];

        if (!properties || !Array.isArray(properties)) {
            console.error("No properties found in XML", jsonObj);
            return { success: false, message: "No properties found" };
        }

        console.log(`Found ${properties.length} properties in XML feed.`);

        const BATCH_SIZE = 50;
        let totalSynced = 0;
        let totalUpdated = 0;

        const mappedProperties: any[] = [];

        for (const p of properties) {
            // Safe helpers
            const getStr = (val: any) => String(val ?? "").trim();
            const getNum = (val: any) => parseFloat(val) || 0;
            const getBool = (val: any) => val === "true" || val === true || val === "1" || val === 1; // Basic checks

            // features logic
            const featureList: string[] = [];
            if (p.features && p.features.feature) {
                if (Array.isArray(p.features.feature)) {
                    featureList.push(...p.features.feature.map((f: any) => getStr(f)));
                } else {
                    featureList.push(getStr(p.features.feature));
                }
            }

            // Extract features
            const extractedFeatures: ParsedFeature = {
                pool: false,
                hasElevator: false,
                hasParking: false,
                hasAC: false,
                hasGarden: false,
                isGated: false,
                hasStorage: false,
                hasHeating: false,
                nearGolf: false,
            };

            for (const f of featureList) {
                const lower = f.toLowerCase();

                // Pool
                if (lower.includes("pool")) {
                    extractedFeatures.pool = true;
                    if (lower.includes("private")) extractedFeatures.poolType = "Private";
                    else if (lower.includes("communal")) extractedFeatures.poolType = "Communal";
                }

                // Beach
                // "Beach: 700 Meters", "Beach: 1.5 km", "Beach: 7000 Meters"
                if (lower.includes("beach")) {
                    const match = lower.match(/beach:\s*([\d\.]+)\s*(meters|km|m)/i);
                    if (match) {
                        let amount = parseFloat(match[1]);
                        const unit = match[2].toLowerCase();
                        if (unit === "km") amount = amount * 1000;
                        extractedFeatures.beachDistance = Math.round(amount);
                    }
                }

                // Other booleans
                if (lower.includes("elevator") || lower.includes("lift")) extractedFeatures.hasElevator = true;
                if (lower.includes("parking") || lower.includes("garage")) extractedFeatures.hasParking = true;
                if (lower.includes("air conditioning") || lower.includes("a/c")) extractedFeatures.hasAC = true;
                if (lower.includes("garden")) extractedFeatures.hasGarden = true;
                if (lower.includes("gated")) extractedFeatures.isGated = true;
                if (lower.includes("storage") || lower.includes("trastero")) extractedFeatures.hasStorage = true;
                if (lower.includes("heating")) extractedFeatures.hasHeating = true;
                if (lower.includes("golf")) extractedFeatures.nearGolf = true;

                // Terrace
                if (lower.includes("terrace")) {
                    const tMatch = lower.match(/terrace:\s*([\d\.]+)/i);
                    if (tMatch) extractedFeatures.terraceSize = parseFloat(tMatch[1]);
                }
            }

            // Images
            const images: string[] = [];
            if (p.images && p.images.image) {
                // Handle if image is object with url or just text? 
                // Kyero feed usually: <images><image id="1"><url>...</url></image></images>
                // OR <images><image>url</image></images>
                const imgs = Array.isArray(p.images.image) ? p.images.image : [p.images.image];
                for (const img of imgs) {
                    if (typeof img === "string") images.push(img);
                    else if (img.url) images.push(img.url);
                    else if (img["#text"]) images.push(img["#text"]);
                }
            }

            // Desc
            let description = "";
            if (p.desc) {
                if (p.desc.sv) description = getStr(p.desc.sv);
                else if (p.desc.en) description = getStr(p.desc.en); // Fallback
            }
            description = normalizePropertyDescription(description);

            // Geo
            const province = getStr(p.province);
            const town = getStr(p.town);
            const region = getRegion(province, town);

            mappedProperties.push({
                externalId: getStr(p.id),
                ref: getStr(p.ref),
                type: getStr(p.type),
                price: getNum(p.price),
                currency: getStr(p.currency) || "EUR",
                beds: getNum(p.beds),
                baths: getNum(p.baths),
                built: getNum(p.surface_built), // Kyero uses surface_built often
                plot: getNum(p.surface_plot),

                province,
                town,
                locationDetail: getStr(p.location), // sometimes used
                region,
                latitude: getNum(p.location?.latitude ?? p.latitude),
                longitude: getNum(p.location?.longitude ?? p.longitude),

                ...extractedFeatures,

                newBuild: getBool(p.new_build),
                energyConsumption: getStr(p.energy_rating?.consumption),
                energyEmissions: getStr(p.energy_rating?.emissions),
                images,
                description,

                // Defualts for admin
                isFeatured: false,
                isHidden: false,

                updatedAt: Date.now(),
            });

            if (mappedProperties.length >= BATCH_SIZE) {
                const batch = mappedProperties.splice(0, BATCH_SIZE);
                const result = await ctx.runMutation(internal.properties.batchUpsert, { properties: batch });
                totalSynced += result.inserted;
                totalUpdated += result.updated;
            }
        }

        // Final batch
        if (mappedProperties.length > 0) {
            const result = await ctx.runMutation(internal.properties.batchUpsert, { properties: mappedProperties });
            totalSynced += result.inserted;
            totalUpdated += result.updated;
        }

        console.log(`Sync complete. Inserted: ${totalSynced}, Updated: ${totalUpdated}`);
        return { inserted: totalSynced, updated: totalUpdated };
    },
});
