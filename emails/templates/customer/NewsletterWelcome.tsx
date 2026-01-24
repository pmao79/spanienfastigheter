import { Html, Body, Head, Container, Text, Preview, Link } from '@react-email/components';
import * as React from 'react';
import EmailHeader from '../../components/EmailHeader';
import EmailFooter from '../../components/EmailFooter';
import HeroImage from '../../components/HeroImage';
import AgentSection from '../../components/AgentSection';

export const NewsletterWelcome = () => {
    return (
        <Html>
            <Head />
            <Preview>Välkommen till Spanienfastigheters nyhetsbrev</Preview>
            <Body style={main}>
                <Container style={container}>
                    <EmailHeader />

                    <HeroImage
                        src="https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?q=80&w=2070"
                        alt="Spanienfastigheter Nyhetsbrev"
                    />

                    <Text style={heading}>Välkommen till insidan!</Text>

                    <Text style={paragraph}>
                        Tack för att du prenumererar på vårt nyhetsbrev. Du har nu förtur till:
                    </Text>

                    <Text style={paragraph}>
                        • <strong>Off-market objekt</strong> som aldrig når Hemnet.<br />
                        • <strong>Marknadsanalyser</strong> och trendspaningar.<br />
                        • <strong>Inbjudningar</strong> till visningsresor och event.
                    </Text>

                    <Text style={paragraph}>
                        Vi skickar ut utvalda objekt och insikter ca 1-2 gånger i månaden. Inget spam, bara värde.
                    </Text>

                    <Text style={paragraph}>
                        Har du några specifika önskemål redan nu? Svara gärna på detta mail så hjälper jag dig direkt.
                    </Text>

                    <AgentSection />

                    <EmailFooter />
                </Container>
            </Body>
        </Html>
    );
};

// Reuse styles
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

export default NewsletterWelcome;
