'use client';

import { useBitcoinRate } from '@/hooks/useBitcoinRate';

interface BitcoinPriceProps {
    priceEur: number;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

export default function BitcoinPrice({ priceEur, className = '', size = 'md' }: BitcoinPriceProps) {
    const { rate, loading } = useBitcoinRate();

    if (loading || !rate) {
        return null;
    }

    const btcPrice = priceEur / rate;

    // Choose font size based on prop
    const textSize = size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm';

    return (
        <div className={`flex items-center gap-1.5 leading-none ${className} animate-fade-in`}>
            <span className={`text-[#c9a86c] font-sans ${size === 'lg' ? 'text-lg' : 'text-sm'}`}>₿</span>
            <span className={`text-[#888888] font-light ${textSize} tracking-tight`}>
                {btcPrice.toLocaleString('sv-SE', {
                    minimumFractionDigits: 3,
                    maximumFractionDigits: 3
                })} BTC
            </span>
        </div>
    );
}
