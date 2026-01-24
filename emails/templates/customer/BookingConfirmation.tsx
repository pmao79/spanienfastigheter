import { Html, Body, Head, Container, Text, Preview } from '@react-email/components';
import * as React from 'react';
import EmailHeader from '../../components/EmailHeader';
import EmailFooter from '../../components/EmailFooter';
import HeroImage from '../../components/HeroImage';
import AgentSection from '../../components/AgentSection';
import InfoBox from '../../components/InfoBox';

interface BookingConfirmationProps {
    name: string;
    date?: string; // If auto-booked
    type: string; // "Telefon" or "Google Meet"
}

export const BookingConfirmation = ({
    name,
    date,
    type = "Rådgivningsmöte",
}: BookingConfirmationProps) => {
    return (
        <Html>
            <Head />
            <Preview>Tack för din förfrågan - Vi kontaktar dig inom 24h</Preview>
            <Body style={main}>
                <Container style={container}>
                    <EmailHeader />

                    <HeroImage
                        src="https://images.unsplash.com/photo-1600596542815-3ad19c6f6dbf?q=80&w=2075"
                        alt="Spanienfastigheter Rådgivning"
                    />

                    <Text style={heading}>Hej {name},</Text>

                    <Text style={paragraph}>
                        Tack för att du bokat en kostnadsfri rådgivning med oss på Spanienfastigheter. Vi har mottagit din förfrågan.
                    </Text>

                    <Text style={paragraph}>
                        En av våra mäklare kommer att kontakta dig inom kort för att bekräfta tiden och ge dig all information du behöver inför vårt samtal. Rådgivningen är helt förutsättningslös.
                    </Text>

                    <InfoBox title="Bokningsdetaljer">
                        <Text style={{ margin: '0 0 5px 0' }}><strong>Typ:</strong> {type}</Text>
                        {date && <Text style={{ margin: '0' }}><strong>Önskad tid:</strong> {date}</Text>}
                    </InfoBox>

                    <Text style={paragraph}>
                        <strong>Under mötet går vi igenom:</strong><br />
                        • Marknadsläget just nu<br />
                        • Vilka områden som passar din livsstil<br />
                        • Hela köpprocessen steg-för-steg
                    </Text>

                    <AgentSection />

                    <EmailFooter />
                </Container>
            </Body>
        </Html>
    );
};

// Reuse styles (in a real app, strict shared styles file is better)
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

export default BookingConfirmation;
