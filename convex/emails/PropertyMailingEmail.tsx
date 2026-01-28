
import {
    Html,
    Head,
    Body,
    Container,
    Section,
    Row,
    Column,
    Img,
    Text,
    Link,
    Button,
    Hr,
    Preview,
} from '@react-email/components';
import * as React from 'react';

// Use strict types for the component props
interface PropertyMailingEmailProps {
    subject: string;
    personalMessage: string;
    properties: Array<{
        _id: string;
        externalId: string;
        ref: string;
        type: string;
        price: number;
        beds: number;
        baths: number;
        built: number;
        terraceSize: number;
        town: string;
        province: string;
        locationDetail?: string; // Can be string or undefined, handled in component
        newBuild: boolean;
        images: string[];
        beachDistance?: number;
    }>;
    signature: {
        name: string;
        title: string;
        phone: string;
        email: string;
        avatarUrl?: string;
        initials: string;
    };
    config: {
        appUrl: string;
        mailingId: string;
    };
}

const icons = {
    // Hosted icons or reused from spanienfastigheter.se if available, 
    // using iconify as placeholder/fallback as before or user provided links if any.
    // User example used: https://spanienfastigheter.se/icons/facebook-white.png
    // I will use the iconify ones I had as they are verified working in previous steps.
    bed: `https://api.iconify.design/lucide:bed.png?color=%231a365d&height=18`, // Navy color for icons
    bath: `https://api.iconify.design/lucide:bath.png?color=%231a365d&height=18`,
    expand: `https://api.iconify.design/lucide:expand.png?color=%231a365d&height=18`,
    sun: `https://api.iconify.design/lucide:sun.png?color=%231a365d&height=18`,
    mapPin: `https://api.iconify.design/lucide:map-pin.png?color=%231a365d&height=14`,
    facebook: `https://api.iconify.design/ic:baseline-facebook.png?color=%23ffffff&height=24`,
    instagram: `https://api.iconify.design/mdi:instagram.png?color=%23ffffff&height=24`,
    linkedin: `https://api.iconify.design/mdi:linkedin.png?color=%23ffffff&height=24`,
};

export const PropertyMailingEmail = ({
    subject,
    personalMessage,
    properties,
    signature,
    config
}: PropertyMailingEmailProps) => (
    <Html>
        <Head>
            <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
        </Head>
        <Preview>{subject}</Preview>

        <Body style={main}>
            <Container style={container}>

                {/* HEADER */}
                <Section style={header}>
                    <Img
                        src="https://spanienfastigheter.se/logo-icon.png"
                        width="48"
                        height="48"
                        alt="Spanienfastigheter"
                        style={{ margin: "0 auto 16px" }}
                    />
                    <Text style={brandText}>
                        SPANIEN<span style={{ color: '#c9a962' }}>FASTIGHETER.SE</span>
                    </Text>
                    <div style={{ width: '50px', height: '3px', backgroundColor: '#c9a962', margin: '16px auto 0' }}></div>
                </Section>

                <Hr style={divider} />

                {/* GREETING */}
                <Section style={content}>
                    <Text style={heading}>{subject}</Text>
                    <Text style={paragraph}>{personalMessage}</Text>
                </Section>

                <Hr style={divider} />

                {/* PROPERTIES */}
                {properties.map((p) => {
                    const propertyUrl = `https://spanienfastigheter.se/objekt/${p.externalId || p._id}`;
                    const trackingUrl = `${config.appUrl}/api/track/click?mailingId=${config.mailingId}&propertyId=${p._id}&redirect=${encodeURIComponent(propertyUrl)}`;
                    const imageUrl = p.images?.[0] || 'https://spanienfastigheter.se/placeholder.jpg';
                    const typeUC = p.type ? p.type.toUpperCase() : "BOSTAD";
                    const refNumber = p.ref || (p.externalId ? `ID: ${p.externalId.substring(0, 6)}` : null);
                    const beachDist = p.beachDistance ? (p.beachDistance >= 1000 ? `${(p.beachDistance / 1000).toLocaleString('sv-SE', { maximumFractionDigits: 1 })} km` : `${p.beachDistance} m`) : null;
                    const terrace = (p.terraceSize && p.terraceSize > 0) ? p.terraceSize : null;

                    // Fix [object Object]: Ensure string
                    let locationText = "";
                    if (p.locationDetail && typeof p.locationDetail === 'string' && p.locationDetail.trim().length > 0) {
                        locationText = `${p.locationDetail}, ${p.province}`;
                    } else {
                        locationText = `${p.town}, ${p.province}`;
                    }

                    return (
                        <Section key={p._id} style={propertyCard}>

                            {/* Property Image with Badge */}
                            <div style={imageContainer}>
                                <Link href={trackingUrl}>
                                    <Img
                                        src={imageUrl}
                                        width="100%"
                                        height="280"
                                        alt={p.type}
                                        style={propertyImage}
                                    />
                                </Link>

                                {/* Ref Badge (Top Right) */}
                                {refNumber && (
                                    <span style={refBadge}>{refNumber}</span>
                                )}

                                {/* Location/Beach Badge (Bottom Left overlay as per user request/example logic?) 
                                    User said: "Lägg till referensnummer-badge... uppe i högra hörnet." which we did.
                                    And "Siffror inte centrerade" etc.
                                    The website uses a map pin bar below image, user linked an image that has "Mijas, Costa del Sol" below image.
                                    Let's put beach distance overlay if requested or stick to the bar below.
                                    User said: "Refine email... image overlay".
                                    Let's try putting beach distance as a badge or bar. I will keep the bar below image structure inside the card for cleanliness,
                                    or stick to user example structure.
                                    User example structure has image, then Ref badge on image.
                                    Then tags.
                                 */}
                            </div>

                            {/* Distance Bar (Below Image) */}
                            {beachDist && (
                                <div style={distanceBar}>
                                    <Img src={icons.mapPin} width="12" height="12" style={{ display: 'inline-block', marginRight: '6px', verticalAlign: 'middle' }} />
                                    <Text style={distanceText}>{beachDist} TILL STRAND</Text>
                                </div>
                            )}

                            <div style={cardContentPadding}>
                                {/* Tags */}
                                <Row style={tagsRow}>
                                    {p.newBuild && (
                                        <span style={tagStyle}>NYPRODUKTION</span>
                                    )}
                                    <span style={tagStyle}>{typeUC}</span>
                                </Row>

                                {/* Title & Location */}
                                <Text style={propertyTitle}>{p.type} i {p.town}</Text>
                                <Text style={propertyLocation}>{locationText}</Text>

                                {/* Price */}
                                <Text style={propertyPrice}>
                                    {Number(p.price).toLocaleString('sv-SE').replace(',', ' ')} €
                                </Text>

                                {/* Specs */}
                                <Row style={specsRow}>
                                    <Column style={specItem}>
                                        <div style={specValueContainer}>
                                            <Img src={icons.bed} width="16" height="16" style={specIcon} />
                                            <Text style={specNumber}>{p.beds}</Text>
                                        </div>
                                        <Text style={specLabel}>sovrum</Text>
                                    </Column>
                                    <Column style={specItemBorder}>
                                        <div style={specValueContainer}>
                                            <Img src={icons.bath} width="16" height="16" style={specIcon} />
                                            <Text style={specNumber}>{p.baths}</Text>
                                        </div>
                                        <Text style={specLabel}>badrum</Text>
                                    </Column>
                                    <Column style={specItemBorder}>
                                        <div style={specValueContainer}>
                                            <Img src={icons.expand} width="16" height="16" style={specIcon} />
                                            <Text style={specNumber}>{p.built}</Text>
                                        </div>
                                        <Text style={specLabel}>m² boyta</Text>
                                    </Column>
                                    {terrace ? (
                                        <Column style={specItemBorder}>
                                            <div style={specValueContainer}>
                                                <Img src={icons.sun} width="16" height="16" style={specIcon} />
                                                <Text style={specNumber}>{terrace}</Text>
                                            </div>
                                            <Text style={specLabel}>m² terrass</Text>
                                        </Column>
                                    ) : (
                                        <Column style={specItem} />
                                    )}
                                </Row>

                                {/* CTA Button */}
                                <Button style={ctaButton} href={trackingUrl}>
                                    VISA BOSTAD
                                </Button>
                            </div>

                        </Section>
                    );
                })}

                <Hr style={divider} />

                {/* AGENT SIGNATURE */}
                <Section style={signatureSection}>
                    <Row>
                        <Column style={avatarColumn}>
                            {signature.avatarUrl ? (
                                <Img
                                    src={signature.avatarUrl}
                                    width="60"
                                    height="60"
                                    alt={signature.name}
                                    style={avatarImage}
                                />
                            ) : (
                                <div style={avatarInitials}>{signature.initials}</div>
                            )}
                        </Column>
                        <Column style={agentInfo}>
                            <Text style={agentName}>{signature.name}</Text>
                            <Text style={agentTitle}>{signature.title}</Text>
                            <div style={agentContact}>
                                <Text style={{ margin: 0 }}>📞 {signature.phone}</Text>
                                <Text style={{ margin: 0 }}>✉️ <Link href={`mailto:${signature.email}`} style={{ color: '#666666', textDecoration: 'none' }}>{signature.email}</Link></Text>
                                <Text style={{ margin: 0 }}>🌐 <Link href="https://spanienfastigheter.se" style={{ color: '#1a365d', textDecoration: 'none' }}>spanienfastigheter.se</Link></Text>
                            </div>
                        </Column>
                    </Row>
                </Section>

                {/* FOOTER */}
                <Section style={footer}>
                    <Row style={socialRow}>
                        <Column align="center" style={{ width: '40px' }}>
                            <Link href="https://facebook.com/spanienfastigheter">
                                <Img src={icons.facebook} width="24" height="24" alt="Facebook" />
                            </Link>
                        </Column>
                        <Column align="center" style={{ width: '40px' }}>
                            <Link href="https://instagram.com/spanienfastigheter">
                                <Img src={icons.instagram} width="24" height="24" alt="Instagram" />
                            </Link>
                        </Column>
                        <Column align="center" style={{ width: '40px' }}>
                            <Link href="https://linkedin.com/company/spanienfastigheter">
                                <Img src={icons.linkedin} width="24" height="24" alt="LinkedIn" />
                            </Link>
                        </Column>
                    </Row>

                    <Text style={footerText}>
                        © {new Date().getFullYear()} Spanienfastigheter AB. Alla rättigheter förbehållna.
                    </Text>
                    <Text style={footerText}>
                        Du får detta mail för att vi har haft kontakt gällande fastigheter i Spanien.
                    </Text>
                    <Link href="#" style={unsubscribeLink}>
                        Avregistrera dig
                    </Link>
                </Section>

            </Container>
        </Body>
    </Html>
);

export default PropertyMailingEmail;

/* STYLES */

const main = {
    backgroundColor: '#f5f5f5',
    fontFamily: '"DM Sans", Arial, sans-serif',
};

const container = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    maxWidth: '600px',
    borderRadius: '4px',
    overflow: 'hidden',
};

const header = {
    padding: '40px 24px',
    textAlign: 'center' as const,
};

const brandText = {
    fontFamily: '"Playfair Display", serif',
    color: '#1a365d',
    fontSize: '22px',
    fontWeight: '700',
    textTransform: 'uppercase' as const,
    letterSpacing: '2px',
    margin: '0',
};

const content = {
    padding: '0 40px',
};

const heading = {
    color: '#1a365d',
    fontSize: '28px',
    fontWeight: '700',
    fontFamily: '"Playfair Display", serif',
    margin: '0 0 24px',
    lineHeight: '1.2',
};

const paragraph = {
    color: '#666666',
    fontSize: '16px',
    lineHeight: '1.8',
    whiteSpace: 'pre-line' as const,
    margin: '0 0 24px',
};

const divider = {
    borderColor: '#e5e5e5',
    margin: '24px 40px',
};

const propertyCard = {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    overflow: 'hidden',
    marginBottom: '32px',
    border: '1px solid #eeeeee',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    margin: '0 20px 32px 20px', // Add margin to card itself within container
    width: 'calc(100% - 40px)', // Adjust width
};

const imageContainer = {
    position: 'relative' as const,
    width: '100%',
};

const propertyImage = {
    width: '100%',
    height: '280px',
    objectFit: 'cover' as const,
    display: 'block',
};

const refBadge = {
    position: 'absolute' as const,
    top: '12px',
    right: '12px',
    backgroundColor: '#1a365d',
    color: '#ffffff',
    padding: '4px 10px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: '600',
    fontFamily: '"DM Sans", sans-serif',
};

const distanceBar = {
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #f3f4f6",
    padding: "8px 16px",
    display: "flex",
    alignItems: "center",
};

const distanceText = {
    fontFamily: '"DM Sans", sans-serif',
    fontSize: "11px",
    fontWeight: "600",
    color: '#1a365d',
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
    margin: 0,
};

const cardContentPadding = {
    padding: '24px',
};

const tagsRow = {
    gap: '8px',
    marginBottom: '12px',
};

const tagStyle = {
    backgroundColor: '#f1f5f9',
    color: '#1a365d',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '10px',
    fontWeight: '700',
    textTransform: 'uppercase' as const,
    marginRight: '8px',
    fontFamily: '"DM Sans", sans-serif',
    letterSpacing: '0.5px',
};

const propertyTitle = {
    color: '#1a365d',
    fontSize: '20px',
    fontWeight: '600',
    margin: '0 0 6px',
    fontFamily: '"Playfair Display", serif',
};

const propertyLocation = {
    color: '#64748b',
    fontSize: '14px',
    margin: '0 0 16px',
    fontFamily: '"DM Sans", sans-serif',
};

const propertyPrice = {
    color: '#c9a962',
    fontSize: '24px',
    fontWeight: '700',
    margin: '0 0 20px',
    fontFamily: '"Playfair Display", serif',
};

const specsRow = {
    borderTop: '1px solid #f1f5f9',
    borderBottom: '1px solid #f1f5f9',
    padding: '16px 0',
    marginBottom: '24px',
};

const specItem = {
    textAlign: 'center' as const,
    verticalAlign: 'top',
    width: '25%',
};

const specItemBorder = {
    textAlign: 'center' as const,
    verticalAlign: 'top',
    width: '25%',
    borderLeft: '1px solid #f1f5f9',
};

const specValueContainer = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '2px',
};

const specIcon = {
    display: 'inline-block',
    marginRight: '4px',
};

const specNumber = {
    color: '#1a365d',
    fontSize: '14px',
    fontWeight: '600',
    margin: '0',
    fontFamily: '"DM Sans", sans-serif',
};

const specLabel = {
    color: '#94a3b8',
    fontSize: '10px',
    textTransform: 'uppercase' as const,
    margin: '0',
    fontFamily: '"DM Sans", sans-serif',
    textAlign: 'center' as const,
};

const ctaButton = {
    backgroundColor: '#1a365d',
    color: '#ffffff',
    padding: '14px 0',
    borderRadius: '6px',
    fontSize: '15px',
    fontWeight: '600',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    width: '100%',
    fontFamily: '"DM Sans", sans-serif',
};

const signatureSection = {
    padding: '0 40px 40px',
};

const avatarColumn = {
    width: '70px',
    verticalAlign: 'top' as const,
};

const avatarImage = {
    borderRadius: '50%',
    objectFit: 'cover' as const,
};

const avatarInitials = {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '#1a365d',
    color: '#ffffff',
    fontSize: '20px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const agentInfo = {
    verticalAlign: 'top' as const,
};

const agentName = {
    color: '#1a365d',
    fontSize: '18px',
    fontWeight: '700',
    margin: '0 0 4px',
    fontFamily: '"Playfair Display", serif',
};

const agentTitle = {
    color: '#64748b',
    fontSize: '14px',
    margin: '0 0 12px',
    fontFamily: '"DM Sans", sans-serif',
};

const agentContact = {
    color: '#64748b',
    fontSize: '14px',
    lineHeight: '1.6',
    fontFamily: '"DM Sans", sans-serif',
};

const footer = {
    backgroundColor: '#1a365d',
    padding: '40px 24px',
    textAlign: 'center' as const,
};

const socialRow = {
    marginBottom: '24px',
    display: 'inline-block', // Center the row itself? No Row is 100% width usually.
    // React Email Row behaves like a table. To center content inside we use Align center on columns.
};

const footerText = {
    color: '#ffffff',
    fontSize: '12px',
    margin: '0 0 8px',
    opacity: 0.8,
    fontFamily: '"DM Sans", sans-serif',
};

const unsubscribeLink = {
    color: '#c9a962', // Gold
    fontSize: '12px',
    textDecoration: 'uppercase',
    fontWeight: '700',
    fontFamily: '"DM Sans", sans-serif',
    marginTop: '16px',
    display: 'inline-block',
};
