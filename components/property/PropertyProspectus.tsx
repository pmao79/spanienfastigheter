import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { Property } from '@/types/property';

// Register fonts (using standard fonts for now to ensure compatibility)
// In a production environment, you would register custom fonts here.

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        fontFamily: 'Helvetica',
    },
    header: {
        backgroundColor: '#0F172A', // Navy
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerLogoText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 2,
    },
    heroImage: {
        width: '100%',
        height: 300,
        objectFit: 'cover',
    },
    contentContainer: {
        padding: 30,
    },
    title: {
        fontSize: 24,
        color: '#0F172A', // Navy
        marginBottom: 5,
        fontFamily: 'Helvetica-Bold',
    },
    subtitle: {
        fontSize: 12,
        color: '#D4B483', // Sand
        marginTop: 5,
        marginBottom: 15,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    priceTag: {
        marginTop: 10,
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#F8FAFC',
        borderLeftWidth: 3,
        borderLeftColor: '#D4B483',
    },
    priceMain: {
        fontSize: 20,
        color: '#0F172A',
        fontFamily: 'Helvetica-Bold',
    },
    priceSub: {
        fontSize: 10,
        color: '#64748B',
        marginTop: 2,
    },
    specsGrid: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
        paddingBottom: 15,
    },
    specItem: {
        flex: 1,
        alignItems: 'center',
    },
    specLabel: {
        fontSize: 8,
        color: '#94A3B8', // Gray-400
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    specValue: {
        fontSize: 12,
        color: '#0F172A', // Navy
        fontFamily: 'Helvetica-Bold',
    },
    description: {
        fontSize: 11,
        color: '#334155', // Gray-700
        lineHeight: 1.5,
        marginBottom: 30,
        textAlign: 'justify',
    },
    featuresContainer: {
        backgroundColor: '#F8FAFC', // Alabaster-ish
        padding: 15,
        borderRadius: 4,
        marginBottom: 30,
    },
    featuresTitle: {
        fontSize: 12,
        color: '#0F172A',
        marginBottom: 10,
        fontFamily: 'Helvetica-Bold',
        borderBottomWidth: 1,
        borderBottomColor: '#D4B483',
        paddingBottom: 5,
    },
    featureRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    featureItem: {
        width: '50%',
        fontSize: 10,
        color: '#475569',
        marginBottom: 5,
    },
    agentCard: {
        marginTop: 'auto',
        borderTopWidth: 1,
        borderTopColor: '#E2E8F0',
        paddingTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    agentImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    agentInfo: {
        flex: 1,
    },
    agentName: {
        fontSize: 12,
        color: '#0F172A',
        fontFamily: 'Helvetica-Bold',
    },
    agentTitle: {
        fontSize: 9,
        color: '#D4B483',
        textTransform: 'uppercase',
        marginBottom: 5,
    },
    agentContact: {
        fontSize: 9,
        color: '#64748B',
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        left: 30,
        right: 30,
        textAlign: 'center',
        fontSize: 8,
        color: '#94A3B8',
        borderTopWidth: 1,
        borderTopColor: '#E2E8F0',
        paddingTop: 10,
    },
});

interface PropertyProspectusProps {
    property: Property;
}

const PropertyProspectus: React.FC<PropertyProspectusProps> = ({ property }) => {
    // Helper to format price
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'EUR' }).format(price);
    };

    const formatSEK = (price: number) => {
        const sek = Math.round(price * 11.2);
        return new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'SEK' }).format(sek);
    };

    // Use specific quote or fallback to description summary
    const agentQuote = (property as any).agentQuote ||
        (property.descriptions.sv ? property.descriptions.sv.substring(0, 140).trim() + "..." : "Kontakta mig för visning.");

    // Ensure we have an image
    const mainImage = property.images[0] || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070';

    // Use the public folder image we just created if testing locally, 
    // but for PDF generation (client-side), standard relative paths often fail.
    // Ideally use absolute URL or base64. 
    // For now, we'll try the relative path but be prepared it might need full URL in some setups.
    // In React-PDF web, absolute URL or imported image often works best.
    // We'll assume the /images path works as it's static.
    const agentImage = '/images/marcus-ohlander.png';

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerLogoText}>SpanienFastigheter.se</Text>
                    <Text style={{ color: '#D4B483', fontSize: 10 }}>Ditt hem i solen</Text>
                </View>

                {/* Hero Banner (Text-based instead of external image to avoid CORS) */}
                <View style={{
                    width: '100%',
                    height: 200,
                    backgroundColor: '#1E293B',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 30,
                }}>
                    <Text style={{ color: '#D4B483', fontSize: 14, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 10 }}>
                        {property.locationDetail || property.town}, {property.province}
                    </Text>
                    <Text style={{ color: '#FFFFFF', fontSize: 32, fontFamily: 'Helvetica-Bold', textAlign: 'center' }}>
                        {property.type} i {property.town}
                    </Text>
                    <Text style={{ color: '#94A3B8', fontSize: 12, marginTop: 15 }}>
                        REF: {property.ref}
                    </Text>
                </View>

                <View style={styles.contentContainer}>
                    {/* Price */}
                    <View style={styles.priceTag}>
                        <Text style={styles.priceMain}>{formatPrice(property.price)}</Text>
                        <Text style={styles.priceSub}>ca {formatSEK(property.price)}</Text>
                    </View>

                    {/* Key Specs */}
                    <View style={styles.specsGrid}>
                        <View style={styles.specItem}>
                            <Text style={styles.specLabel}>SOVRUM</Text>
                            <Text style={styles.specValue}>{property.beds}</Text>
                        </View>
                        <View style={styles.specItem}>
                            <Text style={styles.specLabel}>BADRUM</Text>
                            <Text style={styles.specValue}>{property.baths}</Text>
                        </View>
                        <View style={styles.specItem}>
                            <Text style={styles.specLabel}>BOYTA</Text>
                            <Text style={styles.specValue}>{property.builtArea} m²</Text>
                        </View>
                        {property.terraceArea && (
                            <View style={styles.specItem}>
                                <Text style={styles.specLabel}>TERRASS</Text>
                                <Text style={styles.specValue}>{property.terraceArea} m²</Text>
                            </View>
                        )}
                    </View>

                    {/* Description */}
                    <Text style={styles.description}>
                        {property.descriptions.sv || property.descriptions.en || "Ingen beskrivning tillgänglig."}
                    </Text>

                    {/* Agent Card (Text only, no image to avoid CORS) */}
                    <View style={styles.agentCard}>
                        <View style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                            backgroundColor: '#0F172A',
                            marginRight: 15,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{ color: '#D4B483', fontSize: 20, fontFamily: 'Helvetica-Bold' }}>MO</Text>
                        </View>
                        <View style={styles.agentInfo}>
                            <Text style={styles.agentName}>Marcus Ohlander</Text>
                            <Text style={styles.agentTitle}>Mäklare</Text>
                            <Text style={{ fontSize: 10, color: '#334155', fontStyle: 'italic', marginBottom: 5 }}>
                                &quot;{agentQuote}&quot;
                            </Text>
                            <Text style={styles.agentContact}>+46 0708 62 52 53</Text>
                            <Text style={styles.agentContact}>marcus@spanienfastigheter.se</Text>
                        </View>
                    </View>
                </View>

                {/* Footer */}
                <Text style={styles.footer}>
                    Copyright © {new Date().getFullYear()} Spanienfastigheter.se. Alla rättigheter reserverade.
                </Text>
            </Page>
        </Document>
    );
};

export default PropertyProspectus;
