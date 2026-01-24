import { Section, Text, Link, Hr } from '@react-email/components';
import * as React from 'react';
import SocialIcons from './SocialIcons';

export const EmailFooter = () => {
    const currentYear = new Date().getFullYear();

    return (
        <Section style={styles.section}>
            <div style={styles.container}>
                <Text style={styles.brandName}>Spanienfastigheter.se</Text>
                <Text style={styles.tagline}>Din partner för bostadsköp i Spanien</Text>

                <Hr style={styles.divider} />

                <SocialIcons style={styles.socials} />

                <Hr style={styles.divider} />

                <Text style={styles.contact}>
                    <Link href="tel:+46708625253" style={styles.link}>+46 708 62 52 53</Link>
                    {' • '}
                    <Link href="https://spanienfastigheter.se" style={styles.link}>spanienfastigheter.se</Link>
                </Text>

                <Text style={styles.copyright}>
                    © {currentYear} Spanienfastigheter. Alla rättigheter förbehållna.
                </Text>

                <Text style={styles.disclaimer}>
                    Detta mail skickades eftersom du kontaktade oss via vår hemsida.
                </Text>
            </div>
        </Section>
    );
};

const styles = {
    section: {
        backgroundColor: '#1a2634',
        padding: '40px 0',
        textAlign: 'center' as const,
        marginTop: '40px',
    },
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '0 20px',
    },
    brandName: {
        fontFamily: 'serif',
        fontSize: '20px',
        color: '#ffffff',
        margin: '0 0 5px 0',
    },
    tagline: {
        fontFamily: 'sans-serif',
        fontSize: '12px',
        color: '#8aa2b3',
        margin: '0 0 30px 0',
    },
    divider: {
        borderColor: 'rgba(255,255,255,0.1)',
        margin: '20px 0',
    },
    socials: {
        marginBottom: '20px',
    },
    contact: {
        fontFamily: 'sans-serif',
        fontSize: '14px',
        color: '#c9a86c',
        margin: '0 0 10px 0',
        fontWeight: 600,
    },
    link: {
        color: '#c9a86c',
        textDecoration: 'none',
    },
    copyright: {
        fontFamily: 'sans-serif',
        fontSize: '12px',
        color: '#666666',
        margin: '0 0 5px 0',
    },
    disclaimer: {
        fontFamily: 'sans-serif',
        fontSize: '10px',
        color: '#4a5b6c',
        margin: '0',
    },
};

export default EmailFooter;
