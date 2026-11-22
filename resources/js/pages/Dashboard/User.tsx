import { Head, Link } from '@inertiajs/react';
import AppLayout from '../../layouts/AppLayout';
import { useDemoSession } from '../../modules/auth/presentation/hooks/useDemoSession';
import { useRoleGuard } from '../../modules/auth/presentation/hooks/useRoleGuard';
import { useApplicationHistory } from '../../modules/application/presentation/hooks/useApplicationHistory';

function formatDate(value: string): string {
    return new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(value));
}

function formatStatus(value: string): string {
    return value.split('_').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export default function UserDashboard() {
    const isAuthorized = useRoleGuard('user');
    const { currentAccount } = useDemoSession();
    const applications = useApplicationHistory().filter((application) => application.accountId === currentAccount?.id);

    if (!isAuthorized || !currentAccount) {
        return <AppLayout><div className="page-container py-24 text-center text-sm text-slate-500">Redirecting to your account…</div></AppLayout>;
    }

    return (
        <AppLayout>
            <Head title="My applications" />
            <section className="page-container py-10 sm:py-14">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="eyebrow">User application dashboard</p>
                        <h1 className="mt-4 text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">Welcome, {currentAccount.name}</h1>
                        <p className="mt-3 text-sm leading-6 text-slate-500">Review your demo application history or start a new application.</p>
                    </div>
                    <Link href="/#products" className="button-primary">Explore products <span aria-hidden="true">→</span></Link>
                </div>

                <div className="mt-9 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
                        <p className="text-sm text-slate-500">Your submissions</p>
                        <p className="mt-2 text-3xl font-bold text-brand-navy">{applications.length}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card sm:col-span-2">
                        <p className="text-sm font-semibold text-brand-navy">Demo session</p>
                        <p className="mt-2 text-sm leading-6 text-slate-500">Sample history is provided for this demo. New submissions stay in browser memory for this session and clear when you refresh.</p>
                    </div>
                </div>

                <div className="mt-10">
                    <div className="flex items-end justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-bold text-brand-navy">Application history</h2>
                            <p className="mt-1 text-sm text-slate-500">Only applications submitted by this demo account appear here.</p>
                        </div>
                    </div>

                    {applications.length === 0 ? (
                        <div className="mt-5 rounded-2xl border border-dashed border-slate-200 bg-surface-muted p-8 text-center sm:p-12">
                            <p className="font-semibold text-brand-navy">No applications yet</p>
                            <p className="mt-2 text-sm text-slate-500">Your submitted applications will appear here during this demo session.</p>
                            <Link href="/#products" className="button-primary mt-5">Browse insurance products</Link>
                        </div>
                    ) : (
                        <div className="mt-5 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[640px] text-left text-sm">
                                    <thead className="bg-surface-muted text-xs uppercase tracking-wide text-slate-500">
                                        <tr><th className="px-5 py-4 font-semibold">Product</th><th className="px-5 py-4 font-semibold">Reference</th><th className="px-5 py-4 font-semibold">Submitted</th><th className="px-5 py-4 font-semibold">Status</th></tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {applications.map((application) => (
                                            <tr key={application.referenceNumber}>
                                                <td className="px-5 py-4 font-semibold text-brand-navy">{application.productName}</td>
                                                <td className="px-5 py-4 text-slate-600">{application.referenceNumber}</td>
                                                <td className="px-5 py-4 text-slate-600">{formatDate(application.submittedAt)}</td>
                                                <td className="px-5 py-4"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${application.status === 'submitted' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{formatStatus(application.status)}</span></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </AppLayout>
    );
}
