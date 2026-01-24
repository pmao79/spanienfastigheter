export function formatPrice(price: number): string {
    return new Intl.NumberFormat('sv-SE').format(price) + ' €';
}

export function formatDate(date: Date): string {
    return date.toLocaleString('sv-SE');
}
