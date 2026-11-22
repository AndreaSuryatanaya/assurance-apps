import type { ProductField } from '../../products/domain/product';
import type { InsuranceApplicationDraft } from './insuranceApplication';

export type ApplicationStep = 'applicant' | 'insuredItem' | 'coverage' | 'documents' | 'review';
export type FieldErrors = Record<string, string>;

export function validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePhone(phone: string): boolean {
    return /^[+()\d\s-]{7,20}$/.test(phone);
}

export function validateApplicationStep(
    step: ApplicationStep,
    draft: InsuranceApplicationDraft,
    productFields: ProductField[],
    isMotorProduct: boolean,
): FieldErrors {
    const errors: FieldErrors = {};

    if (step === 'applicant') {
        if (!draft.applicant.fullName.trim()) errors.fullName = 'Enter your full name.';
        if (!validateEmail(draft.applicant.email)) errors.email = 'Enter a valid email address.';
        if (!validatePhone(draft.applicant.phone)) errors.phone = 'Enter a valid phone number.';
        if (!draft.applicant.address.trim()) errors.address = 'Enter your address.';
    }

    if (step === 'insuredItem') {
        productFields.filter((field) => field.required).forEach((field) => {
            if (!draft.insuredItem[field.name]?.trim()) errors[field.name] = `Enter ${field.label.toLowerCase()}.`;
        });
    }

    if (step === 'coverage') {
        if (!draft.coverage.startDate) errors.startDate = 'Choose a start date.';
        if (!draft.coverage.endDate) errors.endDate = 'Choose an end date.';
        if (draft.coverage.startDate && draft.coverage.endDate && draft.coverage.endDate < draft.coverage.startDate) {
            errors.endDate = 'End date must be after the start date.';
        }
        if (isMotorProduct && !draft.coverage.coverageOption) errors.coverageOption = 'Choose a coverage option.';
        if (!isMotorProduct && !draft.coverage.coverageNotes.trim()) errors.coverageNotes = 'Describe the protection you are requesting.';
    }

    if (step === 'review' && !draft.accuracyConfirmed) {
        errors.accuracyConfirmed = 'Please confirm that your information is accurate.';
    }

    return errors;
}
