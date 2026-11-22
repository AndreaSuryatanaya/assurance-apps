import type { ChangeEvent } from 'react';
import type { ProductField } from '../../modules/products/domain/product';

type FormFieldProps = {
    name: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    required?: boolean;
    placeholder?: string;
    type?: ProductField['type'] | 'email' | 'tel';
    options?: string[];
    rows?: number;
};

export default function FormField({ name, label, value, onChange, error, required = false, placeholder, type = 'text', options, rows = 4 }: FormFieldProps) {
    const fieldClassName = `form-control ${error ? 'border-danger focus:border-danger focus:ring-danger/15' : ''}`;
    const commonProps = {
        id: name,
        name,
        value,
        required,
        'aria-invalid': Boolean(error),
        'aria-describedby': error ? `${name}-error` : undefined,
        onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => onChange(event.target.value),
    };

    return (
        <div className="space-y-2">
            <label htmlFor={name} className="block text-sm font-medium text-slate-700">
                {label}{required && <span className="ml-1 text-brand-blue" aria-hidden="true">*</span>}
            </label>
            {type === 'textarea' ? (
                <textarea {...commonProps} rows={rows} placeholder={placeholder} className={`${fieldClassName} resize-y`} />
            ) : type === 'select' ? (
                <select {...commonProps} className={fieldClassName}>
                    <option value="">Select an option</option>
                    {(options ?? []).map((option) => <option value={option} key={option}>{option}</option>)}
                </select>
            ) : (
                <input {...commonProps} type={type} min={type === 'number' ? 0 : undefined} placeholder={placeholder} className={fieldClassName} />
            )}
            {error && <p id={`${name}-error`} className="text-sm text-danger">{error}</p>}
        </div>
    );
}
