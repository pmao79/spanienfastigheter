import { Section, Img, Text } from '@react-email/components';
import * as React from 'react';

export const EmailHeader = () => {
    return (
        <Section style={styles.section}>
            <div style={styles.container}>
                <Text style={styles.brandName}>Spanienfastigheter.se</Text>
                <Text style={styles.tagline}>DIN PARTNER FÖR BOSTADSKÖP I SPANIEN</Text>
            </div>
        </Section>
    );
};

const styles = {
    section: {
        backgroundColor: '#1a2634',
        padding: '30px 0',
        textAlign: 'center' as const,
    },
    container: {
        maxWidth: '600px',
        margin: '0 auto',
    },
    brandName: {
        fontFamily: 'serif',
        fontSize: '24px',
        color: '#ffffff',
        margin: '0 0 5px 0',
        fontWeight: 600,
    },
    tagline: {
        fontFamily: 'sans-serif',
        fontSize: '10px',
        color: '#c9a86c',
        letterSpacing: '2px',
        textTransform: 'uppercase' as const,
        margin: '0',
    },
};

export default EmailHeader;
