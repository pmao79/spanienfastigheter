import { Section, Text } from '@react-email/components';
import * as React from 'react';

interface InfoBoxProps {
    title?: string;
    children: React.ReactNode;
}

export const InfoBox = ({ title, children }: InfoBoxProps) => {
    return (
        <Section style={styles.box}>
            {title && <Text style={styles.title}>{title}</Text>}
            <div style={styles.content}>
                {children}
            </div>
        </Section>
    );
};

const styles = {
    box: {
        backgroundColor: '#faf9f7',
        borderLeft: '4px solid #c9a86c',
        padding: '20px 24px',
        borderRadius: '0 8px 8px 0',
        marginBottom: '30px',
        marginTop: '20px',
    },
    title: {
        fontFamily: 'sans-serif',
        fontSize: '11px',
        textTransform: 'uppercase' as const,
        letterSpacing: '1px',
        color: '#8aa2b3',
        margin: '0 0 10px 0',
        fontWeight: 600,
    },
    content: {
        fontFamily: 'sans-serif',
        fontSize: '15px',
        color: '#333333',
        lineHeight: '1.6',
        margin: '0',
    },
};

export default InfoBox;
