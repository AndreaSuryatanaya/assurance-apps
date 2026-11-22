import { Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { mockUsers } from '../../modules/auth/infrastructure/mockUsers';
import { useRoleGuard } from '../../modules/auth/presentation/hooks/useRoleGuard';

function formatDate(value: string): string {
    return new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(value));
}

export default function AdminUsers() {
    const isAuthorized = useRoleGuard('admin');
    const [searchQuery, setSearchQuery] = useState('');
    const filteredUsers = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        return query ? mockUsers.filter((user) => `${user.name} ${user.email} ${user.id}`.toLowerCase().includes(query)) : mockUsers;
    }, [searchQuery]);

    if (!isAuthorized) return <div className="py-24 text-center text-sm text-slate-500">Redirecting to your account…</div>;

    return (
        <AdminLayout>
            <Head title="Users · Admin" />
            <section>
                <p className="eyebrow">Account management</p>
                <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div><h1 className="text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">Users</h1><p className="mt-3 text-sm leading-6 text-slate-500">Ten fictional individual accounts for exploring the demo.</p></div>
                    <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-card">{mockUsers.length} demo accounts</span>
                </div>

                <label className="mt-7 block max-w-md">
                    <span className="sr-only">Search users</span>
                    <input type="search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search name, email, or user ID" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-brand-navy outline-none transition placeholder:text-slate-400 focus:border-brand-blue focus:ring-4 focus:ring-blue-100" />
                </label>

                {filteredUsers.length === 0 ? (
                    <div className="mt-5 rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center"><p className="font-semibold text-brand-navy">No matching users</p><p className="mt-2 text-sm text-slate-500">Try another search term.</p></div>
                ) : (
                    <div className="mt-5 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[680px] text-left text-sm">
                                <thead className="bg-white text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-4 font-semibold">User</th><th className="px-5 py-4 font-semibold">Email</th><th className="px-5 py-4 font-semibold">Joined</th><th className="px-5 py-4 font-semibold">Status</th></tr></thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filteredUsers.map((user) => (
                                        <tr key={user.id}>
                                            <td className="px-5 py-4"><p className="font-semibold text-brand-navy">{user.name}</p><p className="mt-1 text-xs text-slate-400">{user.id}</p></td>
                                            <td className="px-5 py-4 text-slate-600">{user.email}</td>
                                            <td className="px-5 py-4 text-slate-600">{formatDate(user.joinedAt)}</td>
                                            <td className="px-5 py-4"><span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${user.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{user.status}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                <p className="mt-4 text-xs leading-5 text-slate-400">All accounts are illustrative demo data. Account management and edits are not enabled.</p>
            </section>
        </AdminLayout>
    );
}
