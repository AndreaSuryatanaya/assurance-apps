import { Head, Link } from '@inertiajs/react';
import AdminLayout from '../../layouts/AdminLayout';
import { useApplicationHistory } from '../../modules/application/presentation/hooks/useApplicationHistory';
import { useRoleGuard } from '../../modules/auth/presentation/hooks/useRoleGuard';
import { useUsers } from '../../modules/auth/presentation/hooks/useUsers';

function formatDate(value: string): string {
    return new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(value));
}

export default function AdminDashboard() {
    const isAuthorized = useRoleGuard('admin');
    const applications = useApplicationHistory();
    const users = useUsers();

    if (!isAuthorized) {
        return <div className="py-24 text-center text-sm text-slate-500">Redirecting to your account…</div>;
    }

    return (
        <AdminLayout>
            <Head title="Admin dashboard" />
            <section>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="eyebrow">Admin overview</p>
                        <h1 className="mt-4 text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">Application dashboard</h1>
                        <p className="mt-3 text-sm leading-6 text-slate-500">A read-only overview of sample data and submissions created in this session.</p>
                    </div>
                    <Link href="/admin/submissions" className="button-secondary">View submissions <span aria-hidden="true">→</span></Link>
                </div>

                <div className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
                        <p className="text-sm text-slate-500">Total submissions</p>
                        <p className="mt-2 text-3xl font-bold text-brand-navy">{applications.length}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
                        <p className="text-sm text-slate-500">Demo users</p>
                        <p className="mt-2 text-3xl font-bold text-brand-navy">{users.length}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
                        <p className="text-sm text-slate-500">Products represented</p>
                        <p className="mt-2 text-3xl font-bold text-brand-navy">{new Set(applications.map((application) => application.productSlug)).size}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card"><p className="text-sm text-slate-500">Approved (demo)</p><p className="mt-2 text-3xl font-bold text-brand-navy">{applications.filter((application) => application.status === 'approved').length}</p></div>
                </div>

                <div className="mt-10">
                    <div className="flex items-end justify-between gap-4">
                        <div><h2 className="text-xl font-bold text-brand-navy">Recent submissions</h2><p className="mt-1 text-sm text-slate-500">Latest sample and in-session applications.</p></div>
                        <Link href="/admin/submissions" className="text-sm font-semibold text-brand-blue hover:underline">View all</Link>
                    </div>

                    {applications.length === 0 ? (
                        <div className="mt-5 rounded-2xl border border-dashed border-slate-200 bg-surface-muted p-8 text-center sm:p-12">
                            <p className="font-semibold text-brand-navy">No submissions yet</p>
                            <p className="mt-2 text-sm text-slate-500">Applications will appear here after users submit them.</p>
                        </div>
                    ) : (
                        <div className="mt-5 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[760px] text-left text-sm">
                                    <thead className="bg-surface-muted text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-4 font-semibold">Applicant</th><th className="px-5 py-4 font-semibold">Product</th><th className="px-5 py-4 font-semibold">Reference</th><th className="px-5 py-4 font-semibold">Submitted</th><th className="px-5 py-4 font-semibold">Status</th></tr></thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {applications.slice(0, 5).map((application) => (
                                            <tr key={application.referenceNumber}>
                                                <td className="px-5 py-4 font-medium text-brand-navy">{application.applicantName}</td>
                                                <td className="px-5 py-4 text-slate-600">{application.productName}</td>
                                                <td className="px-5 py-4 text-slate-600">{application.referenceNumber}</td>
                                                <td className="px-5 py-4 text-slate-600">{formatDate(application.submittedAt)}</td>
                                                <td className="px-5 py-4"><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold capitalize text-emerald-700">{application.status}</span></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </AdminLayout>
    );
}
