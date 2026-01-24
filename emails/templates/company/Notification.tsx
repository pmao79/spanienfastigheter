import { Html, Body, Head, Container, Text, Preview, Hr, Section, Row, Column, Button } from '@react-email/components';
import * as React from 'react';
import EmailHeader from '../../components/EmailHeader';
import EmailFooter from '../../components/EmailFooter';
import InfoBox from '../../components/InfoBox';

interface CompanyNotificationProps {
    type: 'VIP' | 'BOOKING' | 'VIEWING' | 'CONTACT' | 'NEWSLETTER';
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    details: Record<string, string | number | undefined>;
    timestamp?: string;
}

export const CompanyNotification = ({
    type,
    customerName,
    customerEmail,
    customerPhone,
    details,
    timestamp = new Date().toLocaleString('sv-SE'),
}: CompanyNotificationProps) => {

    const getTitle = () => {
        switch (type) {
            case 'VIP': return `🏠 Ny VIP-bevakning - ${customerName}`;
            case 'BOOKING': return `📞 Rådgivning - ${customerName}`;
            case 'VIEWING': return `👁️ Visning - ${customerName}`;
            case 'CONTACT': return `💬 Kontakt - ${customerName}`;
            case 'NEWSLETTER': return `📧 Nyhetsbrev - ${customerEmail}`;
            default: return `Ny förfrågan - ${customerName}`;
        }
    };

    return (
        <Html>
            <Head />
            <Preview>{getTitle()}</Preview>
            <Body style={main}>
                <Container style={container}>
                    <EmailHeader />

                    <Text style={heading}>{getTitle()}</Text>
                    <Text style={meta}>Mottaget: {timestamp}</Text>

                    <Hr style={divider} />

                    <Text style={subheading}>KONTAKTINFORMATION</Text>
                    <Section style={card}>
                        <Text style={row}><strong>Namn:</strong> {customerName}</Text>
                        <Text style={row}><strong>Email:</strong> <a href={`mailto:${customerEmail}`} style={link}>{customerEmail}</a></Text>
                        <Text style={row}><strong>Telefon:</strong> <a href={`tel:${customerPhone}`} style={link}>{customerPhone}</a></Text>
                    </Section>

                    <Text style={subheading}>FÖRFRÅGANS DETALJER</Text>
                    <InfoBox>
                        {Object.entries(details).map(([key, value]) => (
                            value ? <Text key={key} style={row}><strong>{key}:</strong> {value}</Text> : null
                        ))}
                    </InfoBox>

                    <Text style={subheading}>SNABBLÄNKAR</Text>
                    <Section>
                        <Row>
                            <Column>
                                <Button href={`mailto:${customerEmail}`} style={button}>
                                    📧 Svara kunden
                                </Button>
                            </Column>
                            <Column>
                                <Button href={`tel:${customerPhone}`} style={buttonOutline}>
                                    📞 Ring kunden
                                </Button>
                            </Column>
                        </Row>
                    </Section>

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
    padding: '20px 0 5px',
    margin: '0',
    fontFamily: 'serif',
};

const meta = {
    fontSize: '12px',
    color: '#8aa2b3',
    margin: '0 0 20px',
};

const divider = {
    borderColor: '#e5e5e5',
    margin: '20px 0',
};

const subheading = {
    fontSize: '11px',
    fontWeight: '700',
    color: '#8aa2b3',
    letterSpacing: '1px',
    textTransform: 'uppercase' as const,
    margin: '20px 0 10px',
};

const card = {
    backgroundColor: '#faf9f7',
    padding: '15px',
    borderRadius: '4px',
    border: '1px solid #e5e5e5',
};

const row = {
    fontSize: '14px',
    color: '#333333',
    margin: '5px 0',
    lineHeight: '1.4',
};

const link = {
    color: '#c9a86c',
    textDecoration: 'none',
};

const button = {
    backgroundColor: '#1a2634',
    color: '#ffffff',
    padding: '12px 20px',
    borderRadius: '4px',
    fontSize: '13px',
    fontWeight: '600',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'inline-block',
    marginRight: '10px',
};

const buttonOutline = {
    backgroundColor: '#ffffff',
    color: '#1a2634',
    border: '1px solid #1a2634',
    padding: '12px 20px',
    borderRadius: '4px',
    fontSize: '13px',
    fontWeight: '600',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'inline-block',
};

export default CompanyNotification;
