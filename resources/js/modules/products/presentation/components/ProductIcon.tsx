type ProductIconProps = {
    name: string;
    className?: string;
};

const iconPaths: Record<string, string> = {
    car: 'M5 16l1.5-5h11L19 16M5 16h14M5 16v3h2v-3m12 0v3h-2v-3M7 11l1.5-3h7L17 11M8 14h.01M16 14h.01',
    building: 'M4 20h16M6 20V6l6-3 6 3v14M9 8h1m4 0h1M9 12h1m4 0h1M10 20v-4h4v4',
    ship: 'M3 15l2 4h14l2-4-9-4-9 4zm3-1V7h12v7M9 7V4h6v3M7 20c1.2 1 2.4 1 3.6 0 1.2 1 2.4 1 3.6 0 1.2 1 2.4 1 3.6 0',
    spark: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3zm7 12 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z',
    phone: 'M8 3h8a1 1 0 011 1v16a1 1 0 01-1 1H8a1 1 0 01-1-1V4a1 1 0 011-1zm3 15h2',
    shield: 'M12 3l8 3v5c0 5-3.4 8.2-8 10-4.6-1.8-8-5-8-10V6l8-3zm-3 9 2 2 4-4',
    home: 'M3 11l9-8 9 8M5 10v10h14V10M9 20v-6h6v6',
    chart: 'M4 20h16M6 17V9m6 8V4m6 13v-6M4 7l5-3 4 3 6-4',
};

export default function ProductIcon({ name, className = '' }: ProductIconProps) {
    return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
            <path d={iconPaths[name] ?? iconPaths.shield} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
