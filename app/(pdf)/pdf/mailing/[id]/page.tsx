"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function MailingPdfPage() {
    const params = useParams();
    const mailingId = params?.id as Id<"propertyMailings">;

    const mailing = useQuery(api.propertyMailings.getById, mailingId ? { id: mailingId } : "skip");

    // Early return AFTER hooks
    if (!mailingId) return <div className="p-10">Ogiltigt ID</div>;
    if (!mailing) return <div className="p-10">Laddar PDF...</div>;

    const properties = mailing.properties || [];

    return (
        <div className="max-w-[210mm] mx-auto bg-white min-h-screen p-[10mm]">
            {/* Header */}
            <div className="flex justify-between items-end border-b-2 border-[#1a365d] pb-6 mb-8">
                <div>
                    {/* Replace with actual logo URL if available */}
                    <div className="text-2xl font-serif font-bold text-[#1a365d] mb-1">
                        SPANIENFASTIGHETER
                    </div>
                    <p className="text-sm text-slate-500 uppercase tracking-widest">Fastighetsförslag</p>
                </div>
                <div className="text-right">
                    <p className="text-sm font-medium text-slate-900">Förberedd för:</p>
                    <p className="text-lg font-serif">
                        {mailing.lead?.firstName} {mailing.lead?.lastName}
                    </p>
                    <p className="text-sm text-slate-500 mt-1">
                        {new Date().toLocaleDateString('sv-SE', { year: 'numeric', month: 'long' })}
                    </p>
                </div>
            </div>

            {/* Intro Message */}
            <div className="mb-12 bg-slate-50 p-6 rounded-lg border-l-4 border-[#1a365d]">
                <h1 className="text-xl font-bold text-[#1a365d] mb-3">{mailing.subject}</h1>
                <p className="text-slate-700 whitespace-pre-line leading-relaxed">
                    {mailing.personalMessage}
                </p>
            </div>

            {/* Properties */}
            <div className="space-y-12">
                {properties.map((property, index) => (
                    <div key={property._id} className="break-inside-avoid">
                        {/* Property Header */}
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-2xl font-serif font-bold text-[#1a365d]">
                                    {property.type} i {property.town}
                                </h2>
                                <p className="text-slate-500">{property.province}, Costa del Sol</p>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold text-[#1a365d]">
                                    {property.price?.toLocaleString()} €
                                </p>
                                <p className="text-xs text-slate-400">Ref: {property.ref || property.externalId}</p>
                            </div>
                        </div>

                        {/* Main Image */}
                        <div className="relative h-[300px] w-full rounded-xl overflow-hidden mb-4 bg-slate-100">
                            {property.images?.[0] && (
                                <Image
                                    src={property.images[0]}
                                    alt={`${property.type} - ${property.town}`}
                                    fill
                                    sizes="100vw"
                                    className="object-cover"
                                    unoptimized
                                />
                            )}
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-[#1a365d] uppercase shadow-sm">
                                {property.type}
                            </div>
                        </div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-4 gap-4 mb-6 border-y border-slate-100 py-4">
                            <Feature icon="🛏️" label="Sovrum" value={property.beds} />
                            <Feature icon="🚿" label="Badrum" value={property.baths} />
                            <Feature icon="📐" label="Yta" value={`${property.built} m²`} />
                            <Feature icon="🏊" label="Pool" value={property.pool ? "Ja" : "Nej"} />
                        </div>

                        {/* secondary images */}
                        <div className="grid grid-cols-3 gap-3 mb-6">
                            {property.images?.slice(1, 4).map((img, i) => (
                                <div key={i} className="relative h-32 rounded-lg overflow-hidden bg-slate-100">
                                    <Image
                                        src={img}
                                        alt={property.town || 'Fastighet'}
                                        fill
                                        sizes="33vw"
                                        className="object-cover"
                                        unoptimized
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Description */}
                        {property.description && (
                            <p className="text-sm text-slate-600 leading-relaxed mb-6 line-clamp-4">
                                {property.description}
                            </p>
                        )}

                        <div className="mt-8 border-b-2 border-slate-100" />
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="mt-auto pt-8 text-center text-sm text-slate-500">
                <p className="font-bold text-[#1a365d] mb-1">{mailing.createdByUser?.name || "Spanienfastigheter"}</p>
                <p>+46 70 123 4567 • info@spanienfastigheter.se</p>
                <p>www.spanienfastigheter.se</p>
            </div>
        </div>
    );
}

function Feature({ icon, label, value }: { icon: string, label: string, value: any }) {
    return (
        <div className="text-center">
            <div className="text-xl mb-1">{icon}</div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400">{label}</p>
            <p className="font-bold text-slate-700">{value}</p>
        </div>
    );
}
