import { Button } from '@react-email/components';
import * as React from 'react';

interface EmailButtonProps {
    href: string;
    children: React.ReactNode;
    style?: React.CSSProperties;
}

export const EmailButton = ({ href, children, style }: EmailButtonProps) => {
    return (
        <Button
            href={href}
            style={{ ...styles.button, ...style }}
        >
            {children}
        </Button>
    );
};

const styles = {
    button: {
        backgroundColor: '#c9a86c',
        color: '#ffffff',
        padding: '16px 32px',
        borderRadius: '4px',
        fontWeight: 600,
        fontSize: '13px',
        textDecoration: 'none',
        textAlign: 'center' as const,
        display: 'inline-block',
        textTransform: 'uppercase' as const,
        letterSpacing: '0.5px',
    },
};

export default EmailButton;
