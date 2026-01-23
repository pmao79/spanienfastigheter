'use client';

import { useState, useEffect } from 'react';

const CACHE_KEY = 'bitcoin_eur_rate';
const CACHE_DURATION_MS = 10 * 60 * 1000; // 10 minutes

interface CacheData {
    rate: number;
    timestamp: number;
}

export function useBitcoinRate() {
    const [rate, setRate] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRate = async () => {
            try {
                // Check cache first
                const cached = localStorage.getItem(CACHE_KEY);
                if (cached) {
                    const { rate: cachedRate, timestamp } = JSON.parse(cached) as CacheData;
                    if (Date.now() - timestamp < CACHE_DURATION_MS) {
                        setRate(cachedRate);
                        setLoading(false);
                        return;
                    }
                }

                // Fetch new data
                const response = await fetch(
                    'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur'
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch Bitcoin rate');
                }

                const data = await response.json();

                // Validate response structure
                if (data && data.bitcoin && typeof data.bitcoin.eur === 'number') {
                    const newRate = data.bitcoin.eur;
                    setRate(newRate);

                    // Update cache
                    const cacheData: CacheData = {
                        rate: newRate,
                        timestamp: Date.now(),
                    };
                    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
                } else {
                    // Fallback to old cache if available even if expired, or just fail
                    // For now, if API format is wrong, we don't set rate (it remains null)
                    console.error('Invalid Bitcoin API response structure');
                }

            } catch (error) {
                console.warn('Error fetching Bitcoin rate:', error);
                // If fetch fails, try to use expired cache as a fallback if it exists?
                // User said "fallback if API doesn't answer", implies showing only EUR.
                // So keeping rate as null is correct behavior.
            } finally {
                setLoading(false);
            }
        };

        fetchRate();
    }, []);

    return { rate, loading };
}
