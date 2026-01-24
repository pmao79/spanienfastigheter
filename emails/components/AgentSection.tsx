import { Section, Text, Img, Link, Row, Column } from '@react-email/components';
import * as React from 'react';

export const AgentSection = () => {
    return (
        <Section style={styles.section}>
            <div style={styles.container}>
                <Text style={styles.heading}>Din personliga kontakt</Text>

                <Section style={styles.card}>
                    <Row>
                        <Column width="100" style={styles.imageCol}>
                            <Img
                                src="https://spanienfastigheter.se/images/marcus-ohlander.png" // Ideally this is a hosted URL
                                alt="Marcus Ohlander"
                                width="80"
                                height="80"
                                style={styles.image}
                            />
                        </Column>
                        <Column>
                            <Text style={styles.name}>Marcus Ohlander</Text>
                            <Text style={styles.title}>Mäklare</Text>
                            <Link href="tel:+46708625253" style={styles.contact}>📞 +46 708 62 52 53</Link>
                            <br />
                            <Link href="mailto:marcus@spanienfastigheter.se" style={styles.contact}>✉ marcus@spanienfastigheter.se</Link>
                        </Column>
                    </Row>
                </Section>
            </div>
        </Section>
    );
};

const styles = {
    section: {
        backgroundColor: '#faf9f7',
        padding: '40px 0',
        marginTop: '40px',
    },
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '0 20px',
    },
    heading: {
        fontFamily: 'serif',
        fontSize: '20px',
        color: '#1a2634',
        textAlign: 'center' as const,
        marginBottom: '20px',
    },
    card: {
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #e5e5e5',
    },
    imageCol: {
        width: '100px',
        verticalAlign: 'middle',
    },
    image: {
        borderRadius: '50%',
        border: '3px solid #c9a86c',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        objectFit: 'cover' as const, // Fixes distortion
        display: 'block',
    },
    name: {
        fontFamily: 'serif',
        fontSize: '18px',
        fontWeight: 600,
        color: '#1a2634',
        margin: '0 0 5px 0',
    },
    title: {
        fontFamily: 'sans-serif',
        fontSize: '14px',
        color: '#c9a86c',
        fontStyle: 'italic',
        margin: '0 0 10px 0',
    },
    contact: {
        fontSize: '14px',
        color: '#666666',
        textDecoration: 'none',
        lineHeight: '1.6',
    }
};

export default AgentSection;
