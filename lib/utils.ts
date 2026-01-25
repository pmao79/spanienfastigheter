import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency: string = 'EUR'): string {
    return new Intl.NumberFormat('sv-SE', {
        style: 'currency',
        currency: currency,
        maximumFractionDigits: 0
    }).format(price);
}
