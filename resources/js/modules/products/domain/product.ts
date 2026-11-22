export type ProductFieldType = 'text' | 'number' | 'date' | 'select' | 'textarea';

export type ProductField = {
    name: string;
    label: string;
    placeholder?: string;
    type: ProductFieldType;
    required?: boolean;
    options?: string[];
};

export type Product = {
    slug: string;
    name: string;
    shortDescription: string;
    description: string;
    icon: string;
    details: string[];
    insuredItemFields: ProductField[];
};

export const motorCoverageOptions = [
    {
        name: 'Comprehensive',
        description: 'Coverage option for a wider range of vehicle damage scenarios.',
    },
    {
        name: 'Total Loss Only (TLO)',
        description: 'Coverage option for total loss scenarios.',
    },
    {
        name: 'Special Insurance “Magic Car”',
        description: 'A special motor coverage option from the demo catalog.',
    },
];
