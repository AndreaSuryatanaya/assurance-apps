import { Link } from '@inertiajs/react';

type SubmissionConfirmationProps = {
    referenceNumber: string;
    productName: string;
};

export default function SubmissionConfirmation({ referenceNumber, productName }: SubmissionConfirmationProps) {
    return (
        <div className="mx-auto max-w-2xl rounded-feature border border-blue-100 bg-white p-8 text-center shadow-card sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" aria-hidden="true"><path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-brand-blue">Application submitted</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-brand-navy">Your next step is in motion.</h1>
            <p className="mx-auto mt-4 max-w-lg leading-7 text-slate-500">Your demo application for <strong className="text-slate-700">{productName}</strong> has been submitted. This is a simulated confirmation and does not represent approval or policy issuance.</p>
            <div className="mx-auto mt-8 max-w-sm rounded-2xl bg-brand-blue-soft px-6 py-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Demo reference number</p>
                <p className="mt-2 text-lg font-bold tracking-wide text-brand-navy">{referenceNumber}</p>
            </div>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/dashboard" className="button-primary">View my applications</Link>
                <Link href="/" className="button-secondary">Return to products</Link>
            </div>
        </div>
    );
}
