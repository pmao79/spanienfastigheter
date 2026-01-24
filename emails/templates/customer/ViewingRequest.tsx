import { Html, Body, Head, Container, Text, Preview, Button } from '@react-email/components';
import * as React from 'react';
import EmailHeader from '../../components/EmailHeader';
import EmailFooter from '../../components/EmailFooter';
import HeroImage from '../../components/HeroImage';
import AgentSection from '../../components/AgentSection';
import PropertyCard, { EmailProperty } from '../../components/PropertyCard';

interface ViewingRequestProps {
    name: string;
    property: EmailProperty;
    viewingDate?: string;
    viewingTime?: string;
    viewingType?: string;
}

export const ViewingRequest = ({
    name,
    property,
    viewingDate,
    viewingTime,
    viewingType,
}: ViewingRequestProps) => {
    return (
        <Html>
            <Head />
            <Preview>Visningsförfrågan mottagen - {property.title}</Preview>
            <Body style={main}>
                <Container style={container}>
                    <EmailHeader />

                    {/* Use property image as hero if high quality, else standard hero */}
                    <HeroImage
                        src={property.image}
                        alt={property.title}
                    />

                    <Text style={heading}>Hej {name},</Text>

                    <Text style={paragraph}>
                        Tack för ditt intresse för <strong>{property.title}</strong> i {property.location}. Vi har mottagit din visningsförfrågan.
                    </Text>

                    {(viewingDate) ? (
                        <Text style={paragraph}>
                            Du har önskat en <strong>{viewingType === 'video' ? 'Videovisning' : 'Visning på plats'}</strong> den <strong>{viewingDate} kl {viewingTime}</strong>. Vi kommer att bekräfta denna tid inom kort.
                        </Text>
                    ) : (
                        <Text style={paragraph}>
                            Vi kommer att kontakta dig inom 24 timmar för att hitta en tid som passar dig, eller svara på dina frågor om bostaden.
                        </Text>
                    )}

                    <Text style={subheading}>Fastigheten du visat intresse för:</Text>
                    <PropertyCard property={property} />

                    <AgentSection />

                    <EmailFooter />
                </Container>
            </Body>
        </Html>
    );
};

const main = {
    backgroundColor: '#ffffff',
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
};

const container = {
    margin: '0 auto',
    padding: '20px 0 48px',
    width: '600px',
    maxWidth: '100%',
};

const heading = {
    fontSize: '24px',
    lineHeight: '1.3',
    fontWeight: '700',
    color: '#1a2634',
    padding: '20px 0 0',
    margin: '0',
    fontFamily: 'serif',
};

const subheading = {
    fontSize: '18px',
    lineHeight: '1.3',
    fontWeight: '600',
    color: '#1a2634',
    padding: '20px 0 10px',
    margin: '0',
    fontFamily: 'serif',
};

const paragraph = {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#333333',
    margin: '20px 0',
};

export default ViewingRequest;
