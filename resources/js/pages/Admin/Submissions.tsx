import { Head } from '@inertiajs/react';
import { useMemo, useState, type FormEvent } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import type { ApplicationHistoryRecord, ApplicationStatus } from '../../modules/application/domain/applicationHistory';
import { createApplicationDraft } from '../../modules/application/domain/insuranceApplication';
import { addApplicationToHistory, deleteApplicationFromHistory, updateApplicationInHistory } from '../../modules/application/infrastructure/inMemoryApplicationHistory';
import { productCatalog } from '../../modules/products/infrastructure/productCatalog';
import { findUserById } from '../../modules/auth/infrastructure/inMemoryUserDirectory';
import { useUsers } from '../../modules/auth/presentation/hooks/useUsers';
import { useRoleGuard } from '../../modules/auth/presentation/hooks/useRoleGuard';
import { useApplicationHistory } from '../../modules/application/presentation/hooks/useApplicationHistory';
import AdminDialog from './components/AdminDialog';

type SubmissionFormValues = {
    accountId: string;
    applicantName: string;
    applicantEmail: string;
    applicantPhone: string;
    applicantAddress: string;
    productSlug: string;
    status: ApplicationStatus;
    coverageOption: string;
    startDate: string;
    endDate: string;
    requestedAmount: string;
    coverageNotes: string;
    insuredItem: Record<string, string>;
    documentNames: string;
    accuracyConfirmed: boolean;
};

const emptyForm: SubmissionFormValues = {
    accountId: '', applicantName: '', applicantEmail: '', applicantPhone: '', applicantAddress: '',
    productSlug: productCatalog[0].slug, status: 'submitted', coverageOption: '', startDate: '', endDate: '',
    requestedAmount: '', coverageNotes: '', insuredItem: {}, documentNames: '', accuracyConfirmed: false,
};
const statusLabels: Record<ApplicationStatus, string> = { submitted: 'Submitted', under_review: 'Under review', needs_information: 'Needs information', approved: 'Approved (demo)' };

function formatDate(value: string): string {
    return new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(value));
}

function formatFieldName(value: string): string {
    return value.replace(/([A-Z])/g, ' $1').replace(/^./, (character) => character.toUpperCase());
}

export default function AdminSubmissions() {
    const isAuthorized = useRoleGuard('admin');
    const applications = useApplicationHistory();
    const users = useUsers();
    const [searchQuery, setSearchQuery] = useState('');
    const [editingReference, setEditingReference] = useState<string | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formValues, setFormValues] = useState<SubmissionFormValues>(emptyForm);
    const [formError, setFormError] = useState('');
    const [selectedSubmission, setSelectedSubmission] = useState<ApplicationHistoryRecord | null>(null);
    const filteredApplications = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return applications;
        return applications.filter((application) => {
            const user = findUserById(application.accountId);
            return [application.applicantName, application.productName, application.referenceNumber, user?.email, statusLabels[application.status]]
                .some((value) => value?.toLowerCase().includes(query));
        });
    }, [applications, searchQuery]);

    if (!isAuthorized) return <div className="py-24 text-center text-sm text-slate-500">Redirecting to your account…</div>;

    function openCreateDialog() {
        const firstActiveUser = users.find((user) => user.status === 'active');
        const defaultProduct = productCatalog[0];
        setEditingReference(null);
        setFormValues({
            ...emptyForm,
            accountId: firstActiveUser?.id ?? '',
            applicantName: firstActiveUser?.name ?? '',
            applicantEmail: firstActiveUser?.email ?? '',
            insuredItem: Object.fromEntries(defaultProduct.insuredItemFields.map((field) => [field.name, ''])),
        });
        setFormError('');
        setIsFormOpen(true);
    }

    function openEditDialog(application: ApplicationHistoryRecord) {
        setEditingReference(application.referenceNumber);
        setFormValues({
            accountId: application.accountId,
            applicantName: application.applicantName,
            applicantEmail: application.details?.applicant.email ?? findUserById(application.accountId)?.email ?? '',
            applicantPhone: application.details?.applicant.phone ?? '',
            applicantAddress: application.details?.applicant.address ?? '',
            productSlug: application.productSlug,
            status: application.status,
            coverageOption: application.details?.coverage.coverageOption ?? '',
            startDate: application.details?.coverage.startDate ?? '',
            endDate: application.details?.coverage.endDate ?? '',
            requestedAmount: application.details?.coverage.requestedAmount ?? '',
            coverageNotes: application.details?.coverage.coverageNotes ?? '',
            insuredItem: application.details?.insuredItem ?? {},
            documentNames: application.details?.documentNames.join('\n') ?? '',
            accuracyConfirmed: application.details?.accuracyConfirmed ?? false,
        });
        setFormError('');
        setIsFormOpen(true);
    }

    function handleAccountChange(accountId: string) {
        const selectedUser = findUserById(accountId);
        setFormValues((current) => ({ ...current, accountId, applicantName: selectedUser?.name ?? current.applicantName, applicantEmail: selectedUser?.email ?? current.applicantEmail }));
    }

    function handleProductChange(productSlug: string) {
        const selectedProduct = productCatalog.find((product) => product.slug === productSlug);
        setFormValues((current) => ({
            ...current,
            productSlug,
            insuredItem: Object.fromEntries(selectedProduct?.insuredItemFields.map((field) => [field.name, '']) ?? []),
        }));
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const selectedUser = findUserById(formValues.accountId);
        const selectedProduct = productCatalog.find((product) => product.slug === formValues.productSlug);
        if (!selectedUser || !selectedProduct) {
            setFormError('Choose a valid user and insurance product.');
            return;
        }

        const previousApplication = editingReference ? applications.find((application) => application.referenceNumber === editingReference) : undefined;
        const details = previousApplication?.details ?? createApplicationDraft();
        const updatedDetails = {
            ...details,
            applicant: { fullName: formValues.applicantName.trim(), email: formValues.applicantEmail.trim(), phone: formValues.applicantPhone.trim(), address: formValues.applicantAddress.trim() },
            insuredItem: formValues.insuredItem,
            coverage: { coverageOption: formValues.coverageOption.trim(), startDate: formValues.startDate, endDate: formValues.endDate, requestedAmount: formValues.requestedAmount, coverageNotes: formValues.coverageNotes.trim() },
            documentNames: formValues.documentNames.split('\n').map((name) => name.trim()).filter(Boolean),
            accuracyConfirmed: formValues.accuracyConfirmed,
        };

        if (editingReference) {
            updateApplicationInHistory(editingReference, {
                accountId: selectedUser.id,
                applicantName: formValues.applicantName.trim(),
                productSlug: selectedProduct.slug,
                productName: selectedProduct.name,
                status: formValues.status,
                details: updatedDetails,
            });
        } else {
            const largestReference = applications.reduce((largest, application) => {
                const match = application.referenceNumber.match(/(\d+)$/);
                return Math.max(largest, match ? Number(match[1]) : 1000);
            }, 1000);
            addApplicationToHistory({
                referenceNumber: `HTV-2026-${largestReference + 1}`,
                accountId: selectedUser.id,
                applicantName: formValues.applicantName.trim(),
                productSlug: selectedProduct.slug,
                productName: selectedProduct.name,
                submittedAt: new Date().toISOString(),
                status: formValues.status,
                details: updatedDetails,
            });
        }
        setIsFormOpen(false);
        setEditingReference(null);
    }

    function handleDelete(application: ApplicationHistoryRecord) {
        if (window.confirm(`Delete submission ${application.referenceNumber}? This action only affects this demo session.`)) {
            deleteApplicationFromHistory(application.referenceNumber);
        }
    }

    function approveSubmission(application: ApplicationHistoryRecord) {
        if (!window.confirm(`Mark ${application.referenceNumber} as approved in this demo? This does not issue an insurance policy.`)) return;

        updateApplicationInHistory(application.referenceNumber, {
            accountId: application.accountId,
            applicantName: application.applicantName,
            productSlug: application.productSlug,
            productName: application.productName,
            status: 'approved',
            details: application.details,
        });
    }

    return (
        <AdminLayout>
            <Head title="Submissions · Admin" />
            <section>
                <p className="eyebrow">Application management</p>
                <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div><h1 className="text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">Submissions</h1><p className="mt-3 text-sm leading-6 text-slate-500">Review, update, and manage demo applications.</p></div>
                    <button type="button" onClick={openCreateDialog} disabled={users.length === 0} className="button-primary disabled:cursor-not-allowed disabled:opacity-50">Add submission <span aria-hidden="true">+</span></button>
                </div>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <label className="block w-full max-w-md"><span className="sr-only">Search submissions</span><input type="search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search applicant, product, email, or reference" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-brand-navy outline-none transition placeholder:text-slate-400 focus:border-brand-blue focus:ring-4 focus:ring-blue-100" /></label>
                    <span className="text-sm text-slate-500">{applications.length} records</span>
                </div>

                {filteredApplications.length === 0 ? (
                    <div className="mt-5 rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center"><p className="font-semibold text-brand-navy">No matching submissions</p><p className="mt-2 text-sm text-slate-500">Try another search term.</p></div>
                ) : (
                    <div className="mt-5 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card">
                        <div className="overflow-x-auto"><table className="w-full min-w-[1080px] text-left text-sm">
                            <thead className="bg-white text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-4 font-semibold">Applicant</th><th className="px-5 py-4 font-semibold">Account email</th><th className="px-5 py-4 font-semibold">Product</th><th className="px-5 py-4 font-semibold">Reference</th><th className="px-5 py-4 font-semibold">Submitted</th><th className="px-5 py-4 font-semibold">Status</th><th className="px-5 py-4 text-right font-semibold">Actions</th></tr></thead>
                            <tbody className="divide-y divide-slate-100">{filteredApplications.map((application) => {
                                const user = findUserById(application.accountId);
                                return <tr key={application.referenceNumber}>
                                    <td className="px-5 py-4 font-semibold text-brand-navy">{application.applicantName}</td>
                                    <td className="px-5 py-4 text-slate-600">{user?.email ?? 'Account removed'}</td>
                                    <td className="px-5 py-4 text-slate-600">{application.productName}</td>
                                    <td className="px-5 py-4 font-medium text-slate-600">{application.referenceNumber}</td>
                                    <td className="px-5 py-4 text-slate-600">{formatDate(application.submittedAt)}</td>
                                    <td className="px-5 py-4"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${application.status === 'approved' ? 'bg-emerald-50 text-emerald-700' : application.status === 'submitted' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'}`}>{statusLabels[application.status]}</span></td>
                                    <td className="px-5 py-4"><div className="flex justify-end gap-1"><button type="button" onClick={() => setSelectedSubmission(application)} className="rounded-lg px-2.5 py-2 text-xs font-semibold text-slate-600 hover:bg-surface-muted">Details</button>{application.status !== 'approved' && <button type="button" onClick={() => approveSubmission(application)} className="rounded-lg px-2.5 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-50">Approve</button>}<button type="button" onClick={() => openEditDialog(application)} className="rounded-lg px-2.5 py-2 text-xs font-semibold text-brand-blue hover:bg-brand-blue-soft">Edit</button><button type="button" onClick={() => handleDelete(application)} className="rounded-lg px-2.5 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50">Delete</button></div></td>
                                </tr>;
                            })}</tbody>
                        </table></div>
                    </div>
                )}
                <p className="mt-4 text-xs leading-5 text-slate-400">Changes are kept in browser memory for this demo and reset when the page is refreshed. Approved (demo) is a simulated status only; it does not issue a policy or represent a real underwriting decision.</p>
            </section>

            {isFormOpen && <AdminDialog title={editingReference ? 'Edit submission' : 'Add submission'} description="Manage submitted applicant and insured item information, requested coverage, and demo handling status." size="wide" onClose={() => setIsFormOpen(false)}>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div><h3 className="mb-3 font-semibold text-brand-navy">Applicant information</h3><div className="grid gap-4 sm:grid-cols-2">
                        <label className="block"><span className="mb-2 block text-sm font-semibold text-brand-navy">Full name</span><input required maxLength={100} value={formValues.applicantName} onChange={(event) => setFormValues((current) => ({ ...current, applicantName: event.target.value }))} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-blue focus:ring-4 focus:ring-blue-100" /></label>
                        <label className="block"><span className="mb-2 block text-sm font-semibold text-brand-navy">Applicant email</span><input required type="email" value={formValues.applicantEmail} onChange={(event) => setFormValues((current) => ({ ...current, applicantEmail: event.target.value }))} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-blue focus:ring-4 focus:ring-blue-100" /></label>
                        <label className="block"><span className="mb-2 block text-sm font-semibold text-brand-navy">Phone</span><input value={formValues.applicantPhone} onChange={(event) => setFormValues((current) => ({ ...current, applicantPhone: event.target.value }))} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-blue focus:ring-4 focus:ring-blue-100" /></label>
                        <label className="block"><span className="mb-2 block text-sm font-semibold text-brand-navy">Address</span><input value={formValues.applicantAddress} onChange={(event) => setFormValues((current) => ({ ...current, applicantAddress: event.target.value }))} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-blue focus:ring-4 focus:ring-blue-100" /></label>
                    </div></div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <label className="block sm:col-span-2"><span className="mb-2 block text-sm font-semibold text-brand-navy">Linked user account</span><select required value={formValues.accountId} onChange={(event) => handleAccountChange(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-blue focus:ring-4 focus:ring-blue-100"><option value="" disabled>Select a user</option>{users.map((user) => <option key={user.id} value={user.id}>{user.name} · {user.email}{user.status === 'inactive' ? ' (inactive)' : ''}</option>)}</select></label>
                        <label className="block sm:col-span-2"><span className="mb-2 block text-sm font-semibold text-brand-navy">Insurance product</span><select value={formValues.productSlug} onChange={(event) => handleProductChange(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-blue focus:ring-4 focus:ring-blue-100">{productCatalog.map((product) => <option key={product.slug} value={product.slug}>{product.name}</option>)}</select></label>
                    </div>
                    <div><h3 className="mb-3 font-semibold text-brand-navy">Insured item</h3><div className="grid gap-4 sm:grid-cols-2">{productCatalog.find((product) => product.slug === formValues.productSlug)?.insuredItemFields.map((field) => <label key={field.name} className="block"><span className="mb-2 block text-sm font-semibold text-brand-navy">{field.label}</span>{field.type === 'select' ? <select required={field.required} value={formValues.insuredItem[field.name] ?? ''} onChange={(event) => setFormValues((current) => ({ ...current, insuredItem: { ...current.insuredItem, [field.name]: event.target.value } }))} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-blue focus:ring-4 focus:ring-blue-100"><option value="">Select an option</option>{field.options?.map((option) => <option key={option}>{option}</option>)}</select> : <input required={field.required} type={field.type} placeholder={field.placeholder} value={formValues.insuredItem[field.name] ?? ''} onChange={(event) => setFormValues((current) => ({ ...current, insuredItem: { ...current.insuredItem, [field.name]: event.target.value } }))} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-blue focus:ring-4 focus:ring-blue-100" />}</label>)}</div></div>
                    <div><h3 className="mb-3 font-semibold text-brand-navy">Requested coverage</h3><div className="grid gap-4 sm:grid-cols-2">
                        <label className="block"><span className="mb-2 block text-sm font-semibold text-brand-navy">Coverage option</span><input value={formValues.coverageOption} onChange={(event) => setFormValues((current) => ({ ...current, coverageOption: event.target.value }))} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-blue focus:ring-4 focus:ring-blue-100" /></label>
                        <label className="block"><span className="mb-2 block text-sm font-semibold text-brand-navy">Requested amount</span><input inputMode="numeric" value={formValues.requestedAmount} onChange={(event) => setFormValues((current) => ({ ...current, requestedAmount: event.target.value }))} placeholder="Optional" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-blue focus:ring-4 focus:ring-blue-100" /></label>
                        <label className="block"><span className="mb-2 block text-sm font-semibold text-brand-navy">Start date</span><input type="date" value={formValues.startDate} onChange={(event) => setFormValues((current) => ({ ...current, startDate: event.target.value }))} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-blue focus:ring-4 focus:ring-blue-100" /></label>
                        <label className="block"><span className="mb-2 block text-sm font-semibold text-brand-navy">End date</span><input type="date" value={formValues.endDate} onChange={(event) => setFormValues((current) => ({ ...current, endDate: event.target.value }))} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-blue focus:ring-4 focus:ring-blue-100" /></label>
                        <label className="block sm:col-span-2"><span className="mb-2 block text-sm font-semibold text-brand-navy">Coverage notes</span><textarea rows={3} value={formValues.coverageNotes} onChange={(event) => setFormValues((current) => ({ ...current, coverageNotes: event.target.value }))} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-blue focus:ring-4 focus:ring-blue-100" /></label>
                        <label className="block sm:col-span-2"><span className="mb-2 block text-sm font-semibold text-brand-navy">Document names (one per line)</span><textarea rows={2} value={formValues.documentNames} onChange={(event) => setFormValues((current) => ({ ...current, documentNames: event.target.value }))} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-blue focus:ring-4 focus:ring-blue-100" /></label>
                    </div></div>
                    <label className="flex items-center gap-3 text-sm text-slate-600"><input type="checkbox" checked={formValues.accuracyConfirmed} onChange={(event) => setFormValues((current) => ({ ...current, accuracyConfirmed: event.target.checked }))} className="h-4 w-4 rounded border-slate-300 text-brand-blue focus:ring-brand-blue" />Applicant confirmed the information is accurate</label>
                    <label className="block"><span className="mb-2 block text-sm font-semibold text-brand-navy">Demo handling status</span><select value={formValues.status} onChange={(event) => setFormValues((current) => ({ ...current, status: event.target.value as ApplicationStatus }))} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-blue focus:ring-4 focus:ring-blue-100">{Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
                    {formError && <p role="alert" className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{formError}</p>}
                    <div className="flex justify-end gap-3 border-t border-slate-100 pt-5"><button type="button" onClick={() => setIsFormOpen(false)} className="button-secondary">Cancel</button><button type="submit" className="button-primary">{editingReference ? 'Save changes' : 'Create submission'}</button></div>
                </form>
            </AdminDialog>}

            {selectedSubmission && <AdminDialog title="Submission details" description="Complete information captured for this demo application." size="wide" onClose={() => setSelectedSubmission(null)}>
                <div className="space-y-6">
                    <div className="grid gap-3 rounded-2xl bg-surface-muted p-5 sm:grid-cols-2"><div><p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Reference number</p><p className="mt-1 font-semibold text-brand-navy">{selectedSubmission.referenceNumber}</p></div><div><p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Current status</p><p className="mt-1 font-semibold text-brand-navy">{statusLabels[selectedSubmission.status]}</p></div><div><p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Product</p><p className="mt-1 font-semibold text-brand-navy">{selectedSubmission.productName}</p></div><div><p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Submitted</p><p className="mt-1 font-semibold text-brand-navy">{formatDate(selectedSubmission.submittedAt)}</p></div></div>
                    <DetailSection title="Applicant information" rows={selectedSubmission.details ? Object.entries(selectedSubmission.details.applicant) : [['fullName', selectedSubmission.applicantName], ['email', findUserById(selectedSubmission.accountId)?.email ?? 'Account removed']]} />
                    <DetailSection title="Insured item" rows={selectedSubmission.details ? Object.entries(selectedSubmission.details.insuredItem) : []} emptyMessage="No insured item details were recorded." />
                    <DetailSection title="Requested coverage" rows={selectedSubmission.details ? Object.entries(selectedSubmission.details.coverage) : []} emptyMessage="No coverage details were recorded." />
                    <div><h3 className="font-semibold text-brand-navy">Supporting documents</h3>{selectedSubmission.details?.documentNames.length ? <ul className="mt-3 space-y-2">{selectedSubmission.details.documentNames.map((documentName) => <li key={documentName} className="rounded-xl border border-slate-100 px-4 py-3 text-sm text-slate-600">{documentName}</li>)}</ul> : <p className="mt-2 text-sm text-slate-500">No documents listed.</p>}</div>
                    <p className="rounded-xl bg-blue-50 px-4 py-3 text-xs leading-5 text-blue-800">Demo record only. The displayed information does not represent an approved policy or an underwriting decision.</p>
                </div>
            </AdminDialog>}
        </AdminLayout>
    );
}

function DetailSection({ title, rows, emptyMessage = 'No information recorded.' }: { title: string; rows: [string, string][]; emptyMessage?: string }) {
    return <div><h3 className="font-semibold text-brand-navy">{title}</h3>{rows.length ? <dl className="mt-3 grid gap-3 sm:grid-cols-2">{rows.map(([label, value]) => <div key={label} className="rounded-xl border border-slate-100 px-4 py-3"><dt className="text-xs font-medium text-slate-400">{formatFieldName(label)}</dt><dd className="mt-1 break-words text-sm font-medium text-slate-700">{value || '—'}</dd></div>)}</dl> : <p className="mt-2 text-sm text-slate-500">{emptyMessage}</p>}</div>;
}
