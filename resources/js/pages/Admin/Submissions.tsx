import { Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { useApplicationHistory } from '../../modules/application/presentation/hooks/useApplicationHistory';
import { findMockUserById } from '../../modules/auth/infrastructure/mockUsers';
import { useRoleGuard } from '../../modules/auth/presentation/hooks/useRoleGuard';

function formatDate(value: string): string {
    return new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(value));
}

export default function AdminSubmissions() {
    const isAuthorized = useRoleGuard('admin');
    const applications = useApplicationHistory();
    const [searchQuery, setSearchQuery] = useState('');
    const filteredApplications = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return applications;

        return applications.filter((application) => {
            const user = findMockUserById(application.accountId);
            return [application.applicantName, application.productName, application.referenceNumber, user?.email]
                .some((value) => value?.toLowerCase().includes(query));
        });
    }, [applications, searchQuery]);

    if (!isAuthorized) return <div className="py-24 text-center text-sm text-slate-500">Redirecting to your account…</div>;

    return (
        <AdminLayout>
            <Head title="Submissions · Admin" />
            <section>
                <p className="eyebrow">Application management</p>
                <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div><h1 className="text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">Submissions</h1><p className="mt-3 text-sm leading-6 text-slate-500">Review sample applications and new submissions from this browser session.</p></div>
                    <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-card">{applications.length} records</span>
                </div>

                <label className="mt-7 block max-w-md">
                    <span className="sr-only">Search submissions</span>
                    <input type="search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search applicant, product, email, or reference" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-brand-navy outline-none transition placeholder:text-slate-400 focus:border-brand-blue focus:ring-4 focus:ring-blue-100" />
                </label>

                {filteredApplications.length === 0 ? (
                    <div className="mt-5 rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center"><p className="font-semibold text-brand-navy">No matching submissions</p><p className="mt-2 text-sm text-slate-500">Try another search term.</p></div>
                ) : (
                    <div className="mt-5 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[900px] text-left text-sm">
                                <thead className="bg-white text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-4 font-semibold">Applicant</th><th className="px-5 py-4 font-semibold">Account email</th><th className="px-5 py-4 font-semibold">Product</th><th className="px-5 py-4 font-semibold">Reference</th><th className="px-5 py-4 font-semibold">Submitted</th><th className="px-5 py-4 font-semibold">Status</th></tr></thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filteredApplications.map((application) => (
                                        <tr key={application.referenceNumber}>
                                            <td className="px-5 py-4 font-semibold text-brand-navy">{application.applicantName}</td>
                                            <td className="px-5 py-4 text-slate-600">{findMockUserById(application.accountId)?.email ?? 'Session user'}</td>
                                            <td className="px-5 py-4 text-slate-600">{application.productName}</td>
                                            <td className="px-5 py-4 font-medium text-slate-600">{application.referenceNumber}</td>
                                            <td className="px-5 py-4 text-slate-600">{formatDate(application.submittedAt)}</td>
                                            <td className="px-5 py-4"><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold capitalize text-emerald-700">{application.status}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                <p className="mt-4 text-xs leading-5 text-slate-400">Sample records are read-only. New submissions are held in memory and clear when this page is refreshed.</p>
            </section>
        </AdminLayout>
    );
}
