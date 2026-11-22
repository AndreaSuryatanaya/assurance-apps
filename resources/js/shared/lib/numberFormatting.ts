export function formatThousands(value: string): string {
    const digits = value.replace(/\D/g, '');

    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function keepDigits(value: string): string {
    return value.replace(/\D/g, '');
}
