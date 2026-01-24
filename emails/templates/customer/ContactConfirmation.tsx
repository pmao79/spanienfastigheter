import { Html, Body, Head, Container, Text, Preview } from '@react-email/components';
import * as React from 'react';
import EmailHeader from '../../components/EmailHeader';
import EmailFooter from '../../components/EmailFooter';
import HeroImage from '../../components/HeroImage';
import AgentSection from '../../components/AgentSection';
import InfoBox from '../../components/InfoBox';

interface ContactConfirmationProps {
    name: string;
    message: string;
    objectTitle?: string;
}

export const ContactConfirmation = ({
    name,
    message,
    objectTitle,
}: ContactConfirmationProps) => {
    return (
        <Html>
            <Head />
            <Preview>Tack för ditt meddelande - Spanienfastigheter</Preview>
            <Body style={main}>
                <Container style={container}>
                    <EmailHeader />

                    <HeroImage
                        src="https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80&w=2070"
                        alt="Spanienfastigheter"
                    />

                    <Text style={heading}>Hej {name},</Text>

                    <Text style={paragraph}>
                        Tack för att du hör av dig till oss. Vi har mottagit ditt meddelande{objectTitle ? ` gällande ${objectTitle}` : ''} och återkommer till dig så snart vi kan, oftast inom 24 timmar.
                    </Text>

                    <InfoBox title="Ditt meddelande">
                        <Text style={{ margin: '0', fontStyle: 'italic' }}>"{message}"</Text>
                    </InfoBox>

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

const paragraph = {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#333333',
    margin: '20px 0',
};

export default ContactConfirmation;
