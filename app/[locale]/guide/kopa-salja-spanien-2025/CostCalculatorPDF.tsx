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
    subHeader: {
        fontSize: 10,
        color: '#64748B', // Gray
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 14,
        color: '#0F172A',
        fontFamily: 'Helvetica-Bold',
        marginBottom: 10,
        backgroundColor: '#F1F5F9',
        padding: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: '#E2E8F0',
        paddingBottom: 2,
    },
    label: {
        fontSize: 10,
        color: '#334155',
    },
    value: {
        fontSize: 10,
        color: '#0F172A',
        fontFamily: 'Helvetica-Bold',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#0F172A',
    },
    totalLabel: {
        fontSize: 12,
        color: '#0F172A',
        fontFamily: 'Helvetica-Bold',
    },
    totalValue: {
        fontSize: 12,
        color: '#0F172A',
        fontFamily: 'Helvetica-Bold',
    },
    disclaimer: {
        marginTop: 'auto',
        fontSize: 8,
        color: '#94A3B8',
        fontStyle: 'italic',
        textAlign: 'center',
        borderTopWidth: 1,
        borderTopColor: '#E2E8F0',
        paddingTop: 10,
    },
    footer: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 8,
        color: '#CBD5E1',
    }
});

interface CostCalculatorPDFProps {
    price: number;
    region: string; // 'andalusia' | 'valencia'
    type: string; // 'resale' | 'new'
    purchaseCosts: {
        taxLabel: string;
        taxAmount: number;
        legalFees: number;
        total: number;
        cashNeeded: number;
    };
    monthlyCosts: {
        communityFee: number;
        utilities: number;
        ibi: number;
        garbage: number;
        insurance: number;
        mortgagePayment: number;
        totalMonthly: number;
    };
    mortgageDetails?: {
        useMortgage: boolean;
        ltv: number;
        interestRate: number;
        years: number;
        loanAmount: number;
    };
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(amount);
};

const CostCalculatorPDF: React.FC<CostCalculatorPDFProps> = ({ price, region, type, purchaseCosts, monthlyCosts, mortgageDetails }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.logoText}>SpanienFastigheter.se</Text>
                        <Text style={styles.subHeader}>Din kalkyl för {type === 'new' ? 'Nyproduktion' : 'Begagnat'} i {region === 'andalusia' ? 'Andalusien' : 'Valencia'}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 8, color: '#64748B' }}>Datum: {new Date().toLocaleDateString()}</Text>
                    </View>
                </View>

                {/* Purchase Breakdown */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Investering & Engångskostnader</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Pris på bostad</Text>
                        <Text style={styles.value}>{formatCurrency(price)}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>{purchaseCosts.taxLabel}</Text>
                        <Text style={styles.value}>{formatCurrency(purchaseCosts.taxAmount)}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Notarie, Jurist & Register (ca 1.5%)</Text>
                        <Text style={styles.value}>{formatCurrency(purchaseCosts.legalFees)}</Text>
                    </View>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>TOTALT ATT BETALA</Text>
                        <Text style={styles.totalValue}>{formatCurrency(purchaseCosts.total)}</Text>
                    </View>
                </View>

                {/* Mortgage Details */}
                {mortgageDetails?.useMortgage && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Finansiering (Bolån)</Text>
                        <View style={styles.row}>
                            <Text style={styles.label}>Belåningsgrad (LTV)</Text>
                            <Text style={styles.value}>{mortgageDetails.ltv}%</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Lånebelopp</Text>
                            <Text style={styles.value}>{formatCurrency(mortgageDetails.loanAmount)}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Ränta</Text>
                            <Text style={styles.value}>{mortgageDetails.interestRate}%</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Amorteringstid</Text>
                            <Text style={styles.value}>{mortgageDetails.years} år</Text>
                        </View>
                        <View style={{ ...styles.totalRow, borderTopStyle: 'dashed' }}>
                            <Text style={styles.totalLabel}>KONTANTINSATS KRÄVS</Text>
                            <Text style={styles.totalValue}>{formatCurrency(purchaseCosts.cashNeeded)}</Text>
                        </View>
                    </View>
                )}

                {/* Monthly Costs */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Uppskattade Månadskostnader</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Samfällighet (Comunidad)</Text>
                        <Text style={styles.value}>{Math.round(monthlyCosts.communityFee)} € / mån</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Drift (El, Vatten, Internet)</Text>
                        <Text style={styles.value}>{Math.round(monthlyCosts.utilities)} € / mån</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Fastighetsskatt (IBI) - utslaget per mån</Text>
                        <Text style={styles.value}>{Math.round(monthlyCosts.ibi / 12)} € / mån</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Hemförsäkring - utslaget per mån</Text>
                        <Text style={styles.value}>{Math.round(monthlyCosts.insurance / 12)} € / mån</Text>
                    </View>

                    {mortgageDetails?.useMortgage && (
                        <View style={{ ...styles.row, marginTop: 5, borderBottomWidth: 0 }}>
                            <Text style={{ ...styles.label, fontFamily: 'Helvetica-Bold' }}>Lånekostnad (Ränta + Amort.)</Text>
                            <Text style={styles.value}>{formatCurrency(monthlyCosts.mortgagePayment)} / mån</Text>
                        </View>
                    )}

                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>TOTAL MÅNADSKOSTNAD</Text>
                        <Text style={styles.totalValue}>{formatCurrency(monthlyCosts.totalMonthly)} / mån</Text>
                    </View>
                </View>

                {/* Disclaimer */}
                <Text style={styles.disclaimer}>
                    Detta är en uppskattning baserad på generella schabloner och de värden du angivit.
                    Den utgör inte ett bindande lånelöfte eller en exakt offert.
                    Skattesatser och avgifter kan variera beroende på exakt plats och marknadsläge.
                    Kontakta alltid en jurist och mäklare för en exakt kalkyl innan köp.
                </Text>
                <Text style={styles.footer}>
                    Genererad av SpanienFastigheter.se
                </Text>
            </Page>
        </Document>
    );
};

export default CostCalculatorPDF;
