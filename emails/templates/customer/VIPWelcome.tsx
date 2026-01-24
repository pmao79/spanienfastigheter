import { Html, Body, Head, Container, Text, Preview } from '@react-email/components';
import * as React from 'react';
import EmailHeader from '../../components/EmailHeader';
import EmailFooter from '../../components/EmailFooter';
import HeroImage from '../../components/HeroImage';
import AgentSection from '../../components/AgentSection';
import InfoBox from '../../components/InfoBox';
import PropertyCard, { EmailProperty } from '../../components/PropertyCard';

interface VIPWelcomeProps {
    name: string;
    preferences: {
        areas: string;
        propertyType: string;
        budget: string;
    };
    matchingProperties?: EmailProperty[];
}

export const VIPWelcome = ({
    name,
    preferences,
    matchingProperties = [],
}: VIPWelcomeProps) => {
    return (
        <Html>
            <Head />
            <Preview>Välkommen till VIP Söktjänsten - Spanienfastigheter</Preview>
            <Body style={main}>
                <Container style={container}>
                    <EmailHeader />

                    <HeroImage
                        src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070"
                        alt="Spanienfastigheter VIP"
                    />

                    <Text style={heading}>Hej {name},</Text>

                    <Text style={paragraph}>
                        Välkommen till vår VIP Söktjänst. Vi har mottagit dina preferenser och har nu påbörjat den manuella sökningen efter din drömbostad i Spanien.
                    </Text>

                    <Text style={paragraph}>
                        Som VIP-medlem får du förtur till nya objekt och tillgång till "off-market" fastigheter som aldrig når den öppna marknaden.
                    </Text>

                    <InfoBox title="Dina registrerade önskemål">
                        <Text style={{ margin: '0 0 5px 0' }}><strong>Område:</strong> {preferences.areas}</Text>
                        <Text style={{ margin: '0 0 5px 0' }}><strong>Typ:</strong> {preferences.propertyType}</Text>
                        <Text style={{ margin: '0' }}><strong>Budget:</strong> {preferences.budget}</Text>
                    </InfoBox>

                    {matchingProperties.length > 0 ? (
                        <>
                            <Text style={subheading}>Vi hittade några objekt som kan passa direkt:</Text>
                            {matchingProperties.map((prop) => (
                                <PropertyCard key={prop.id} property={prop} />
                            ))}
                        </>
                    ) : (
                        <Text style={paragraph}>
                            Vi söker just nu efter fastigheter som matchar dina preferenser. Du kommer att få ett personligt urval från oss inom kort.
                        </Text>
                    )}

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

export default VIPWelcome;
