import type { ReactNode } from 'react';
import FormField from '../../../../shared/components/FormField';
import type { Product } from '../../../products/domain/product';
import { motorCoverageOptions } from '../../../products/domain/product';
import type { InsuranceApplicationDraft } from '../../domain/insuranceApplication';
import type { FieldErrors } from '../../domain/applicationRules';
import { formatThousands } from '../../../../shared/lib/numberFormatting';
import StepIndicator from './StepIndicator';

type ApplicationWizardProps = {
    product: Product;
    draft: InsuranceApplicationDraft;
    currentStep: number;
    errors: FieldErrors;
    isSubmitting: boolean;
    onApplicantChange: (name: keyof InsuranceApplicationDraft['applicant'], value: string) => void;
    onInsuredItemChange: (name: string, value: string) => void;
    onCoverageChange: (name: keyof InsuranceApplicationDraft['coverage'], value: string) => void;
    onDocumentNamesChange: (names: string[]) => void;
    onAccuracyChange: (confirmed: boolean) => void;
    onContinue: () => void;
    onBack: () => void;
    onEditStep: (stepIndex: number) => void;
    onSubmit: () => void;
};

const stepNames = ['Applicant', 'Insured item', 'Coverage', 'Documents', 'Review'];

function ReviewSection({ title, stepIndex, onEdit, children }: { title: string; stepIndex: number; onEdit: (stepIndex: number) => void; children: ReactNode }) {
    return (
        <section className="border-b border-slate-100 py-5 last:border-b-0">
            <div className="flex items-center justify-between gap-4">
                <h3 className="font-semibold text-brand-navy">{title}</h3>
                <button type="button" className="text-sm font-semibold text-brand-blue hover:text-brand-navy" onClick={() => onEdit(stepIndex)}>Edit</button>
            </div>
            <div className="mt-3 space-y-2 text-sm text-slate-600">{children}</div>
        </section>
    );
}

function ReviewValue({ label, value }: { label: string; value?: string }) {
    return <p><span className="text-slate-400">{label}:</span> <span className="font-medium text-slate-700">{value || 'Not provided'}</span></p>;
}

export default function ApplicationWizard(props: ApplicationWizardProps) {
    const {
        product, draft, currentStep, errors, isSubmitting, onApplicantChange, onInsuredItemChange,
        onCoverageChange, onDocumentNamesChange, onAccuracyChange, onContinue, onBack, onEditStep, onSubmit,
    } = props;
    const isLastStep = currentStep === stepNames.length - 1;

    function renderApplicantStep() {
        return (
            <div className="grid gap-5 sm:grid-cols-2">
                <FormField name="fullName" label="Full name" value={draft.applicant.fullName} onChange={(value) => onApplicantChange('fullName', value)} error={errors.fullName} required placeholder="Enter your full name" />
                <FormField name="email" label="Email address" type="email" value={draft.applicant.email} onChange={(value) => onApplicantChange('email', value)} error={errors.email} required placeholder="you@example.com" />
                <FormField name="phone" label="Phone number" type="tel" value={draft.applicant.phone} onChange={(value) => onApplicantChange('phone', value)} error={errors.phone} required placeholder="Enter your phone number" />
                <div className="sm:col-span-2"><FormField name="address" label="Home address" value={draft.applicant.address} onChange={(value) => onApplicantChange('address', value)} error={errors.address} required placeholder="Street, city, and postal code" /></div>
            </div>
        );
    }

    function renderInsuredItemStep() {
        return (
            <div className="grid gap-5 sm:grid-cols-2">
                {product.insuredItemFields.map((field) => (
                    <div key={field.name} className={field.type === 'textarea' ? 'sm:col-span-2' : ''}>
                        <FormField name={field.name} label={field.label} type={field.type} value={draft.insuredItem[field.name] ?? ''} onChange={(value) => onInsuredItemChange(field.name, value)} error={errors[field.name]} required={field.required} placeholder={field.placeholder} options={field.options} formatThousands={field.type === 'number' && field.name !== 'vehicleYear'} />
                    </div>
                ))}
            </div>
        );
    }

    function renderCoverageStep() {
        return (
            <div className="space-y-6">
                {product.slug === 'motor-vehicle' ? (
                    <fieldset>
                        <legend className="text-sm font-medium text-slate-700">Choose a coverage option<span className="ml-1 text-brand-blue">*</span></legend>
                        <div className="mt-3 grid gap-3">
                            {motorCoverageOptions.map((option) => (
                                <label key={option.name} className={`flex cursor-pointer gap-4 rounded-2xl border p-4 transition ${draft.coverage.coverageOption === option.name ? 'border-brand-blue bg-brand-blue-soft/70 ring-2 ring-brand-blue/10' : 'border-slate-200 hover:border-blue-200'}`}>
                                    <input type="radio" name="coverageOption" value={option.name} checked={draft.coverage.coverageOption === option.name} onChange={(event) => onCoverageChange('coverageOption', event.target.value)} className="mt-1 accent-brand-blue" />
                                    <span><span className="block text-sm font-semibold text-brand-navy">{option.name}</span><span className="mt-1 block text-sm text-slate-500">{option.description}</span></span>
                                </label>
                            ))}
                        </div>
                        {errors.coverageOption && <p className="mt-2 text-sm text-danger">{errors.coverageOption}</p>}
                    </fieldset>
                ) : (
                    <FormField name="coverageNotes" label="Protection you are requesting" type="textarea" value={draft.coverage.coverageNotes} onChange={(value) => onCoverageChange('coverageNotes', value)} error={errors.coverageNotes} required placeholder="Describe the protection you would like to request" />
                )}
                <div className="grid gap-5 sm:grid-cols-2">
                    <FormField name="startDate" label="Requested start date" type="date" value={draft.coverage.startDate} onChange={(value) => onCoverageChange('startDate', value)} error={errors.startDate} required />
                    <FormField name="endDate" label="Requested end date" type="date" value={draft.coverage.endDate} onChange={(value) => onCoverageChange('endDate', value)} error={errors.endDate} required />
                    <FormField name="requestedAmount" label="Requested sum insured (optional)" type="number" value={draft.coverage.requestedAmount} onChange={(value) => onCoverageChange('requestedAmount', value)} placeholder="Enter amount" formatThousands />
                    {product.slug === 'motor-vehicle' && <div className="sm:col-span-2"><FormField name="coverageNotes" label="Additional notes (optional)" type="textarea" value={draft.coverage.coverageNotes} onChange={(value) => onCoverageChange('coverageNotes', value)} placeholder="Anything else you would like us to know?" rows={3} /></div>}
                </div>
            </div>
        );
    }

    function renderDocumentsStep() {
        return (
            <div className="rounded-2xl border border-dashed border-blue-200 bg-brand-blue-soft/40 p-6 sm:p-8">
                <label htmlFor="documents" className="block text-sm font-semibold text-brand-navy">Add supporting documents</label>
                <p className="mt-2 text-sm leading-6 text-slate-500">Choose files to show how document collection works. Files are not uploaded or stored in this demo.</p>
                <input id="documents" type="file" multiple accept=".pdf,.jpg,.jpeg,.png" onChange={(event) => onDocumentNamesChange(Array.from(event.target.files ?? []).map((file) => file.name))} className="mt-5 block w-full cursor-pointer text-sm text-slate-600 file:mr-4 file:rounded-xl file:border-0 file:bg-white file:px-4 file:py-2.5 file:font-semibold file:text-brand-blue hover:file:bg-blue-50" />
                {draft.documentNames.length > 0 && <ul className="mt-5 space-y-2">{draft.documentNames.map((name) => <li className="flex items-center gap-2 text-sm text-slate-600" key={name}><span className="text-brand-blue">✓</span>{name}</li>)}</ul>}
                <p className="mt-5 text-xs leading-5 text-slate-400">You can continue without adding a file.</p>
            </div>
        );
    }

    function renderReviewStep() {
        return (
            <div>
                <div className="divide-y divide-slate-100">
                    <ReviewSection title="Applicant details" stepIndex={0} onEdit={onEditStep}>
                        <ReviewValue label="Name" value={draft.applicant.fullName} /><ReviewValue label="Email" value={draft.applicant.email} /><ReviewValue label="Phone" value={draft.applicant.phone} /><ReviewValue label="Address" value={draft.applicant.address} />
                    </ReviewSection>
                    <ReviewSection title="Insured item" stepIndex={1} onEdit={onEditStep}>
                        {product.insuredItemFields.map((field) => {
                            const value = draft.insuredItem[field.name];
                            const shouldFormat = field.type === 'number' && field.name !== 'vehicleYear';

                            return <ReviewValue key={field.name} label={field.label} value={value && shouldFormat ? formatThousands(value) : value} />;
                        })}
                    </ReviewSection>
                    <ReviewSection title="Coverage request" stepIndex={2} onEdit={onEditStep}>
                        {draft.coverage.coverageOption && <ReviewValue label="Option" value={draft.coverage.coverageOption} />}
                        <ReviewValue label="Start date" value={draft.coverage.startDate} /><ReviewValue label="End date" value={draft.coverage.endDate} /><ReviewValue label="Requested sum insured" value={draft.coverage.requestedAmount ? formatThousands(draft.coverage.requestedAmount) : ''} /><ReviewValue label="Notes" value={draft.coverage.coverageNotes} />
                    </ReviewSection>
                    <ReviewSection title="Documents" stepIndex={3} onEdit={onEditStep}>
                        {draft.documentNames.length ? draft.documentNames.map((name) => <ReviewValue key={name} label="File" value={name} />) : <p>No documents selected.</p>}
                    </ReviewSection>
                </div>
                <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl bg-surface-muted p-4">
                    <input type="checkbox" checked={draft.accuracyConfirmed} onChange={(event) => onAccuracyChange(event.target.checked)} className="mt-1 h-4 w-4 rounded border-slate-300 accent-brand-blue" />
                    <span className="text-sm leading-6 text-slate-600">I confirm that the information in this application is accurate to the best of my knowledge.</span>
                </label>
                {errors.accuracyConfirmed && <p className="mt-2 text-sm text-danger">{errors.accuracyConfirmed}</p>}
            </div>
        );
    }

    const stepContent = [renderApplicantStep(), renderInsuredItemStep(), renderCoverageStep(), renderDocumentsStep(), renderReviewStep()];
    const descriptions = [
        'Tell us how to reach you about this application.',
        `Share a few details about the ${product.name.toLowerCase()} you want to protect.`,
        'Choose your preferred cover and requested protection period.',
        'Add any supporting documents you would like to include.',
        'Check your information before you submit your application.',
    ];

    return (
        <div className="mx-auto max-w-3xl">
            <div className="rounded-feature border border-slate-100 bg-white p-5 shadow-card sm:p-8 lg:p-10">
                <StepIndicator currentStep={currentStep} steps={stepNames} />
                <div className="mt-9 border-b border-slate-100 pb-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-blue">Step {currentStep + 1} of {stepNames.length}</p>
                    <h1 className="mt-2 text-2xl font-bold tracking-tight text-brand-navy sm:text-3xl">{stepNames[currentStep]}</h1>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{descriptions[currentStep]}</p>
                </div>
                <div className="py-7">{stepContent[currentStep]}</div>
                <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <button type="button" onClick={onBack} disabled={currentStep === 0 || isSubmitting} className="button-secondary disabled:cursor-not-allowed disabled:opacity-40">Back</button>
                    {isLastStep ? (
                        <button type="button" onClick={onSubmit} disabled={isSubmitting} className="button-primary disabled:cursor-wait disabled:opacity-70">{isSubmitting ? 'Submitting…' : 'Submit application'} <span aria-hidden="true">→</span></button>
                    ) : (
                        <button type="button" onClick={onContinue} className="button-primary">Continue <span aria-hidden="true">→</span></button>
                    )}
                </div>
            </div>
            <p className="mx-auto mt-5 max-w-xl text-center text-xs leading-5 text-slate-400">This is a demo application. Your information remains in browser memory and is cleared when you refresh.</p>
        </div>
    );
}
