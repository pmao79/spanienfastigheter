import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        fontFamily: 'Helvetica',
        padding: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
        borderBottomWidth: 2,
        borderBottomColor: '#D4B483', // Sand
        paddingBottom: 10,
    },
    logoText: {
        fontSize: 18,
        color: '#0F172A', // Navy
        fontFamily: 'Helvetica-Bold',
        textTransform: 'uppercase',
    },
    titleBox: {
        backgroundColor: '#0F172A',
        padding: 15,
        marginBottom: 20,
        borderRadius: 4,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 20,
        fontFamily: 'Helvetica-Bold',
        textAlign: 'center',
    },
    subtitle: {
        color: '#D4B483',
        fontSize: 10,
        textAlign: 'center',
        marginTop: 5,
        textTransform: 'uppercase',
    },
    stepContainer: {
        marginBottom: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
        flexDirection: 'row',
    },
    stepNumberBubble: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#0F172A',
        color: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
    },
    stepNumber: {
        fontSize: 14,
        fontFamily: 'Helvetica-Bold',
        color: '#FFFFFF',
        textAlign: 'center',
        marginTop: 8, // Optical adjustment for vertical centering
    },
    stepContent: {
        flex: 1,
    },
    stepTitle: {
        fontSize: 14,
        color: '#0F172A', // Navy
        fontFamily: 'Helvetica-Bold',
        marginBottom: 5,
    },
    stepDescription: {
        fontSize: 10,
        color: '#334155', // Charcoal
        lineHeight: 1.4,
    },
    importantTag: {
        marginTop: 5,
        fontSize: 8,
        color: '#EF4444', // Red-500
        fontFamily: 'Helvetica-Bold',
        backgroundColor: '#FEE2E2',
        padding: 3,
        alignSelf: 'flex-start',
        borderRadius: 2,
    },
    footer: {
        marginTop: 'auto',
        fontSize: 8,
        color: '#94A3B8',
        textAlign: 'center',
        borderTopWidth: 1,
        borderTopColor: '#E2E8F0',
        paddingTop: 10,
    }
});

const ChecklistPDF = () => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.logoText}>SpanienFastigheter.se</Text>
                    <Text style={{ fontSize: 8, color: '#64748B' }}>Uppdaterad 2025/2026</Text>
                </View>

                {/* Title */}
                <View style={styles.titleBox}>
                    <Text style={styles.title}>Köpa Bostad i Spanien</Text>
                    <Text style={styles.subtitle}>Officiell Checklista & Process</Text>
                </View>

                {/* Steps */}
                <View style={{ marginTop: 10 }}>

                    {/* Step 1 */}
                    <View style={styles.stepContainer}>
                        <View style={styles.stepNumberBubble}>
                            <Text style={styles.stepNumber}>1</Text>
                        </View>
                        <View style={styles.stepContent}>
                            <Text style={styles.stepTitle}>Förberedelse & NIE</Text>
                            <Text style={styles.stepDescription}>
                                Du måste ha ett spanskt skatte-ID (NIE). Via ambassaden tar det 3-5 månader.
                                Vi hjälper dig göra det på plats (3-4 veckor) via ombud.
                            </Text>
                        </View>
                    </View>

                    {/* Step 2 */}
                    <View style={styles.stepContainer}>
                        <View style={styles.stepNumberBubble}>
                            <Text style={styles.stepNumber}>2</Text>
                        </View>
                        <View style={styles.stepContent}>
                            <Text style={styles.stepTitle}>Boka & Reservera</Text>
                            <Text style={styles.stepDescription}>
                                En reservationsavgift läggs (ofta 6 000 €) för att ta bostaden av marknaden i ca 14-30 dagar.
                            </Text>
                            <Text style={styles.importantTag}>VIKTIGT: Betala aldrig direkt till säljaren!</Text>
                        </View>
                    </View>

                    {/* Step 3 */}
                    <View style={styles.stepContainer}>
                        <View style={styles.stepNumberBubble}>
                            <Text style={styles.stepNumber}>3</Text>
                        </View>
                        <View style={styles.stepContent}>
                            <Text style={styles.stepTitle}>Due Diligence (Besiktning)</Text>
                            <Text style={styles.stepDescription}>
                                Vi kontrollerar bostadens legala status.
                                - LPO (Licencia de Primera Ocupación)
                                - Skulder och inteckningar (Nota Simple)
                                - Infracción Urbanística (Olagliga byggnationer)
                            </Text>
                        </View>
                    </View>

                    {/* Step 4 */}
                    <View style={styles.stepContainer}>
                        <View style={styles.stepNumberBubble}>
                            <Text style={styles.stepNumber}>4</Text>
                        </View>
                        <View style={styles.stepContent}>
                            <Text style={styles.stepTitle}>Arras (Handpenning)</Text>
                            <Text style={styles.stepDescription}>
                                Nu skrivs det privata köpekontraktet och 10% betalas (minus reservationen).
                                Om säljaren drar sig ur nu måste de betala tillbaka dubbla handpenningen enligt lag.
                            </Text>
                        </View>
                    </View>

                    {/* Step 5 */}
                    <View style={styles.stepContainer}>
                        <View style={styles.stepNumberBubble}>
                            <Text style={styles.stepNumber}>5</Text>
                        </View>
                        <View style={{ ...styles.stepContent, borderBottomWidth: 0 }}>
                            <Text style={styles.stepTitle}>Notarie & Tillträde</Text>
                            <Text style={styles.stepDescription}>
                                Resterande 90% betalas via bankväxel hos Notarius Publicus.
                                Du får nycklarna och blir formell ägare inskriven i lagfarten.
                            </Text>
                        </View>
                    </View>

                </View>

                {/* Footer */}
                <View style={{ marginTop: 20, padding: 15, backgroundColor: '#F8FAFC', borderRadius: 4 }}>
                    <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#0F172A', marginBottom: 5 }}>Behöver du hjälp?</Text>
                    <Text style={{ fontSize: 9, color: '#334155' }}>
                        Boka en kostnadsfri rådgivning med våra mäklare så guidar vi dig genom varje steg.
                        hello@spanienfastigheter.se | +46 708 62 52 53
                    </Text>
                </View>

                <Text style={styles.footer}>
                    Copyright © {new Date().getFullYear()} Spanienfastigheter.se. Alla rättigheter reserverade.
                </Text>
            </Page>
        </Document>
    );
};

export default ChecklistPDF;
