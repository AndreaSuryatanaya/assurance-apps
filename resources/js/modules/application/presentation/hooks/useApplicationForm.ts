import { useMemo, useState } from 'react';
import { createApplication } from '../../application/createApplication';
import { submitApplication } from '../../application/submitApplication';
import { validateApplicationStep, type ApplicationStep, type FieldErrors } from '../../domain/applicationRules';
import type { InsuranceApplicationDraft } from '../../domain/insuranceApplication';
import { mockApplicationSubmission } from '../../infrastructure/mockApplicationSubmission';
import type { Product } from '../../../products/domain/product';

const applicationSteps: ApplicationStep[] = ['applicant', 'insuredItem', 'coverage', 'documents', 'review'];

export function useApplicationForm(product: Product) {
    const [draft, setDraft] = useState<InsuranceApplicationDraft>(() => createApplication());
    const [currentStep, setCurrentStep] = useState(0);
    const [errors, setErrors] = useState<FieldErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [referenceNumber, setReferenceNumber] = useState<string | null>(null);
    const isMotorProduct = product.slug === 'motor-vehicle';

    const currentStepName = useMemo(() => applicationSteps[currentStep], [currentStep]);

    function updateApplicant(name: keyof InsuranceApplicationDraft['applicant'], value: string) {
        setDraft((current) => ({ ...current, applicant: { ...current.applicant, [name]: value } }));
        setErrors((current) => ({ ...current, [name]: '' }));
    }

    function updateInsuredItem(name: string, value: string) {
        setDraft((current) => ({ ...current, insuredItem: { ...current.insuredItem, [name]: value } }));
        setErrors((current) => ({ ...current, [name]: '' }));
    }

    function updateCoverage(name: keyof InsuranceApplicationDraft['coverage'], value: string) {
        setDraft((current) => ({ ...current, coverage: { ...current.coverage, [name]: value } }));
        setErrors((current) => ({ ...current, [name]: '' }));
    }

    function updateDocumentNames(documentNames: string[]) {
        setDraft((current) => ({ ...current, documentNames }));
    }

    function setAccuracyConfirmed(accuracyConfirmed: boolean) {
        setDraft((current) => ({ ...current, accuracyConfirmed }));
        setErrors((current) => ({ ...current, accuracyConfirmed: '' }));
    }

    function goToStep(stepIndex: number) {
        setCurrentStep(stepIndex);
        setErrors({});
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function continueToNextStep() {
        const nextErrors = validateApplicationStep(currentStepName, draft, product.insuredItemFields, isMotorProduct);
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) return;
        goToStep(Math.min(currentStep + 1, applicationSteps.length - 1));
    }

    function goToPreviousStep() {
        goToStep(Math.max(currentStep - 1, 0));
    }

    async function submit() {
        const nextErrors = validateApplicationStep('review', draft, product.insuredItemFields, isMotorProduct);
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) return;

        setIsSubmitting(true);
        try {
            const result = await submitApplication(draft, product.name, mockApplicationSubmission);
            setReferenceNumber(result.referenceNumber);
        } finally {
            setIsSubmitting(false);
        }
    }

    return {
        draft,
        currentStep,
        errors,
        isSubmitting,
        referenceNumber,
        updateApplicant,
        updateInsuredItem,
        updateCoverage,
        updateDocumentNames,
        setAccuracyConfirmed,
        continueToNextStep,
        goToPreviousStep,
        goToStep,
        submit,
    };
}
