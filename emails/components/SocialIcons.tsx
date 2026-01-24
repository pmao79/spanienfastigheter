import { Link, Img } from '@react-email/components';
import * as React from 'react';

interface SocialIconsProps {
    style?: React.CSSProperties;
}

export const SocialIcons = ({ style }: SocialIconsProps) => {
    return (
        <div style={{ ...styles.container, ...style }}>
            <Link href="https://instagram.com/spanienfastigheter.se" style={styles.link}>
                <Img
                    src="https://cdn-images.mailchimp.com/icons/social-block-v2/light-instagram-48.png"
                    width="32"
                    height="32"
                    alt="Instagram"
                    style={styles.icon}
                />
            </Link>
            <Link href="https://www.facebook.com/profile.php?id=61587167753513" style={styles.link}>
                <Img
                    src="https://cdn-images.mailchimp.com/icons/social-block-v2/light-facebook-48.png"
                    width="32"
                    height="32"
                    alt="Facebook"
                    style={styles.icon}
                />
            </Link>
            <Link href="https://linkedin.com/company/spanienfastigheter-se" style={styles.link}>
                <Img
                    src="https://cdn-images.mailchimp.com/icons/social-block-v2/light-linkedin-48.png"
                    width="32"
                    height="32"
                    alt="LinkedIn"
                    style={styles.icon}
                />
            </Link>
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center' as const,
        width: '100%',
    },
    link: {
        textDecoration: 'none',
        display: 'inline-block',
        margin: '0 8px', // Adds 16px total spacing between icons
    },
    icon: {
        display: 'block',
        border: 'none',
    }
};

export default SocialIcons;
