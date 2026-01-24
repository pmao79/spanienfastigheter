import { Section, Text, Img, Button, Row, Column } from '@react-email/components';
import * as React from 'react';

// Simplified property interface for email
export interface EmailProperty {
    id: string;
    title: string;
    type: string;
    location: string;
    price: number;
    image: string;
    beds: number;
    baths: number;
    area: number;
    url: string;
}

interface PropertyCardProps {
    property: EmailProperty;
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
    return (
        <Section style={styles.card}>
            <Img
                src={property.image}
                alt={property.title}
                width="100%"
                height="180"
                style={styles.image}
            />
            <div style={styles.content}>
                <Text style={styles.title}>{property.type} i {property.location}</Text>
                <Text style={styles.subtitle}>{property.location}</Text>

                <Text style={styles.price}>
                    {property.price.toLocaleString('sv-SE')} €
                </Text>

                <Section style={styles.specs}>
                    <Row>
                        <Column>
                            <Text style={styles.specText}>🛏 {property.beds}</Text>
                        </Column>
                        <Column>
                            <Text style={styles.specText}>🛁 {property.baths}</Text>
                        </Column>
                        <Column>
                            <Text style={styles.specText}>📐 {property.area} m²</Text>
                        </Column>
                    </Row>
                </Section>

                <Button href={property.url} style={styles.button}>
                    Visa Fastighet
                </Button>
            </div>
        </Section>
    );
};

const styles = {
    card: {
        backgroundColor: '#ffffff',
        border: '1px solid #e5e5e5',
        borderRadius: '8px',
        overflow: 'hidden' as const,
        marginBottom: '20px',
        maxWidth: '100%',
    },
    image: {
        width: '100%',
        height: '180px',
        objectFit: 'cover' as const,
        display: 'block',
    },
    content: {
        padding: '20px',
    },
    title: {
        fontFamily: 'serif',
        fontSize: '18px',
        color: '#1a2634',
        margin: '0 0 5px 0',
        fontWeight: 600,
    },
    subtitle: {
        fontFamily: 'sans-serif',
        fontSize: '13px',
        color: '#666666',
        margin: '0 0 15px 0',
    },
    price: {
        fontFamily: 'serif',
        fontSize: '20px',
        color: '#c9a86c',
        fontWeight: 'bold',
        margin: '0 0 15px 0',
    },
    specs: {
        marginBottom: '20px',
    },
    specText: {
        fontSize: '14px',
        color: '#666666',
        margin: '0',
    },
    button: {
        backgroundColor: '#c9a86c',
        color: '#ffffff',
        padding: '12px 24px',
        borderRadius: '4px',
        fontSize: '14px',
        fontWeight: 600,
        textDecoration: 'none',
        textAlign: 'center' as const,
        display: 'block',
        width: '100%',
        boxSizing: 'border-box' as const,
    },
};

export default PropertyCard;
