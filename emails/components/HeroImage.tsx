import { Section, Img, Text } from '@react-email/components';
import * as React from 'react';

interface HeroImageProps {
    src: string;
    alt: string;
    height?: number;
}

export const HeroImage = ({ src, alt, height = 280 }: HeroImageProps) => {
    return (
        <Section style={styles.container}>
            <div style={{ ...styles.overlay, height: `${height}px` }}>
                {/* Note: Gradients on overlays are tricky in email. 
                 Best practice is to burn the gradient into the image or use a trusted background image support.
                 However, simple dark overlay or solid color works safely. 
                 We will use a relative container with an image. */}
                <Img
                    src={src}
                    alt={alt}
                    width="100%"
                    height={height}
                    style={styles.image}
                />
                {/* Gradient Overlay using CSS - support varies, but safe degradation is just image */}
                <div style={styles.gradient} />
            </div>
        </Section>
    );
};

const styles = {
    container: {
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: '#1a2634', // fallback
    },
    overlay: {
        position: 'relative' as const,
        width: '100%',
        overflow: 'hidden',
    },
    image: {
        objectFit: 'cover' as const,
        width: '100%',
        display: 'block',
    },
    gradient: {
        position: 'absolute' as const,
        top: 0,
        left: 0,
        width: '100%',
        height: '100px', // Top part
        background: 'linear-gradient(to bottom, rgba(26,38,52,0.3), transparent)',
        pointerEvents: 'none' as const,
    },
};

export default HeroImage;
