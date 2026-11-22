import { Head, Link } from '@inertiajs/react';
import AppLayout from '../../layouts/AppLayout';
import ApplicationWizard from '../../modules/application/presentation/components/ApplicationWizard';
import SubmissionConfirmation from '../../modules/application/presentation/components/SubmissionConfirmation';
import { useApplicationForm } from '../../modules/application/presentation/hooks/useApplicationForm';
import { findProductBySlug } from '../../modules/products/infrastructure/productCatalog';
import type { Product } from '../../modules/products/domain/product';
import { useRoleGuard } from '../../modules/auth/presentation/hooks/useRoleGuard';

type ApplicationCreateProps = {
    productSlug: string;
};

export default function ApplicationCreate({ productSlug }: ApplicationCreateProps) {
    const isAuthorized = useRoleGuard('user');
    const product = findProductBySlug(productSlug);

    if (!isAuthorized) {
        return <AppLayout><Head title="Sign in required" /><div className="page-container py-24 text-center text-sm text-slate-500">Redirecting to sign in…</div></AppLayout>;
    }

    if (!product) {
        return (
            <AppLayout>
                <Head title="Product not found" />
                <div className="page-container py-24 text-center">
                    <h1 className="text-3xl font-bold text-brand-navy">We couldn’t find that product.</h1>
                    <p className="mt-3 text-slate-500">Choose one of our available insurance products to start an application.</p>
                    <Link href="/" className="button-primary mt-7">Browse products</Link>
                </div>
            </AppLayout>
        );
    }

    return <ApplicationCreateForm product={product} />;
}

function ApplicationCreateForm({ product }: { product: Product }) {
    const form = useApplicationForm(product);

    return (
        <AppLayout>
            <Head title={`Apply for ${product.name}`} />
            <section className="page-container pb-16 pt-10 sm:pb-20 sm:pt-14">
                <Link href={`/products/${product.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:text-brand-navy"><span aria-hidden="true">←</span> Back to product details</Link>
                <div className="mb-8 mt-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <p className="text-sm font-semibold text-brand-blue">Application for</p>
                        <h2 className="mt-1 text-xl font-bold text-brand-navy sm:text-2xl">{product.name}</h2>
                    </div>
                    <p className="max-w-md text-sm leading-6 text-slate-500">Complete each step at your own pace. You can review your details before submitting.</p>
                </div>
                {form.referenceNumber ? (
                    <SubmissionConfirmation referenceNumber={form.referenceNumber} productName={product.name} />
                ) : (
                    <ApplicationWizard
                        product={product}
                        draft={form.draft}
                        currentStep={form.currentStep}
                        errors={form.errors}
                        isSubmitting={form.isSubmitting}
                        onApplicantChange={form.updateApplicant}
                        onInsuredItemChange={form.updateInsuredItem}
                        onCoverageChange={form.updateCoverage}
                        onDocumentNamesChange={form.updateDocumentNames}
                        onAccuracyChange={form.setAccuracyConfirmed}
                        onContinue={form.continueToNextStep}
                        onBack={form.goToPreviousStep}
                        onEditStep={form.goToStep}
                        onSubmit={form.submit}
                    />
                )}
            </section>
        </AppLayout>
    );
}
