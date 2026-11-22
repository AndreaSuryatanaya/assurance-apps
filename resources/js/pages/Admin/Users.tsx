import { Head } from '@inertiajs/react';
import { useMemo, useState, type FormEvent } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import type { DemoUserRecord } from '../../modules/auth/domain/demoUserRecord';
import { createUser, deleteUser, updateUser } from '../../modules/auth/infrastructure/inMemoryUserDirectory';
import { useUsers } from '../../modules/auth/presentation/hooks/useUsers';
import { useRoleGuard } from '../../modules/auth/presentation/hooks/useRoleGuard';
import AdminDialog from './components/AdminDialog';

type UserFormValues = Omit<DemoUserRecord, 'id'>;

const emptyUserForm: UserFormValues = { name: '', email: '', status: 'active', joinedAt: new Date().toISOString().slice(0, 10) };

function formatDate(value: string): string {
    return new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(value));
}

export default function AdminUsers() {
    const isAuthorized = useRoleGuard('admin');
    const users = useUsers();
    const [searchQuery, setSearchQuery] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingUserId, setEditingUserId] = useState<string | null>(null);
    const [formValues, setFormValues] = useState<UserFormValues>(emptyUserForm);
    const [formError, setFormError] = useState('');
    const filteredUsers = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        return query ? users.filter((user) => `${user.name} ${user.email} ${user.id}`.toLowerCase().includes(query)) : users;
    }, [searchQuery, users]);

    if (!isAuthorized) return <div className="py-24 text-center text-sm text-slate-500">Redirecting to your account…</div>;

    function openCreateDialog() {
        setIsFormOpen(true);
        setEditingUserId(null);
        setFormValues({ ...emptyUserForm, joinedAt: new Date().toISOString().slice(0, 10) });
        setFormError('');
    }

    function openEditDialog(user: DemoUserRecord) {
        setIsFormOpen(true);
        setEditingUserId(user.id);
        setFormValues({ name: user.name, email: user.email, status: user.status, joinedAt: user.joinedAt });
        setFormError('');
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const normalizedEmail = formValues.email.trim().toLowerCase();
        const emailExists = normalizedEmail === 'admin@haltev.demo'
            || users.some((user) => user.id !== editingUserId && user.email.toLowerCase() === normalizedEmail);
        if (emailExists) {
            setFormError('A user with this email already exists.');
            return;
        }

        const normalizedValues = { ...formValues, name: formValues.name.trim(), email: normalizedEmail };
        if (editingUserId) {
            updateUser(editingUserId, normalizedValues);
        } else {
            const largestId = users.reduce((largest, user) => Math.max(largest, Number(user.id.replace('user-', '')) || 0), 0);
            createUser({ id: `user-${String(largestId + 1).padStart(3, '0')}`, ...normalizedValues });
        }
        setEditingUserId(null);
        setIsFormOpen(false);
    }

    function handleDelete(user: DemoUserRecord) {
        const confirmed = window.confirm(`Delete ${user.name}? Associated submission records will remain, and this account will no longer be available for demo sign-in.`);
        if (confirmed) deleteUser(user.id);
    }

    return (
        <AdminLayout>
            <Head title="Users · Admin" />
            <section>
                <p className="eyebrow">Account management</p>
                <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div><h1 className="text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">Users</h1><p className="mt-3 text-sm leading-6 text-slate-500">Manage demo user accounts and their sign-in availability.</p></div>
                    <button type="button" onClick={openCreateDialog} className="button-primary">Add user <span aria-hidden="true">+</span></button>
                </div>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <label className="block w-full max-w-md">
                        <span className="sr-only">Search users</span>
                        <input type="search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search name, email, or user ID" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-brand-navy outline-none transition placeholder:text-slate-400 focus:border-brand-blue focus:ring-4 focus:ring-blue-100" />
                    </label>
                    <span className="text-sm text-slate-500">{users.length} users · {users.filter((user) => user.status === 'active').length} active</span>
                </div>

                {filteredUsers.length === 0 ? (
                    <div className="mt-5 rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center"><p className="font-semibold text-brand-navy">No matching users</p><p className="mt-2 text-sm text-slate-500">Try another search term.</p></div>
                ) : (
                    <div className="mt-5 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[840px] text-left text-sm">
                                <thead className="bg-white text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-4 font-semibold">User</th><th className="px-5 py-4 font-semibold">Email</th><th className="px-5 py-4 font-semibold">Joined</th><th className="px-5 py-4 font-semibold">Status</th><th className="px-5 py-4 text-right font-semibold">Actions</th></tr></thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filteredUsers.map((user) => (
                                        <tr key={user.id}>
                                            <td className="px-5 py-4"><p className="font-semibold text-brand-navy">{user.name}</p><p className="mt-1 text-xs text-slate-400">{user.id}</p></td>
                                            <td className="px-5 py-4 text-slate-600">{user.email}</td>
                                            <td className="px-5 py-4 text-slate-600">{formatDate(user.joinedAt)}</td>
                                            <td className="px-5 py-4"><span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${user.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{user.status}</span></td>
                                            <td className="px-5 py-4"><div className="flex justify-end gap-2"><button type="button" onClick={() => openEditDialog(user)} className="rounded-lg px-3 py-2 text-xs font-semibold text-brand-blue hover:bg-brand-blue-soft">Edit</button><button type="button" onClick={() => handleDelete(user)} className="rounded-lg px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50">Delete</button></div></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                <p className="mt-4 text-xs leading-5 text-slate-400">Active user accounts can sign in with the shared demo password. Changes stay in browser memory and reset when the page is refreshed.</p>
            </section>

            {isFormOpen ? (
                <AdminDialog title={editingUserId ? 'Edit user' : 'Add user'} description="Manage the user profile and demo sign-in availability." onClose={() => { setIsFormOpen(false); setEditingUserId(null); setFormValues(emptyUserForm); }}>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <label className="block"><span className="mb-2 block text-sm font-semibold text-brand-navy">Full name</span><input required maxLength={100} value={formValues.name} onChange={(event) => setFormValues((current) => ({ ...current, name: event.target.value }))} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-blue focus:ring-4 focus:ring-blue-100" /></label>
                        <label className="block"><span className="mb-2 block text-sm font-semibold text-brand-navy">Email address</span><input required type="email" maxLength={160} value={formValues.email} onChange={(event) => setFormValues((current) => ({ ...current, email: event.target.value }))} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-blue focus:ring-4 focus:ring-blue-100" /></label>
                        <label className="block"><span className="mb-2 block text-sm font-semibold text-brand-navy">Account status</span><select value={formValues.status} onChange={(event) => setFormValues((current) => ({ ...current, status: event.target.value as UserFormValues['status'] }))} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-blue focus:ring-4 focus:ring-blue-100"><option value="active">Active</option><option value="inactive">Inactive</option></select></label>
                        {formError && <p role="alert" className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{formError}</p>}
                        <div className="flex justify-end gap-3 border-t border-slate-100 pt-5"><button type="button" onClick={() => { setIsFormOpen(false); setEditingUserId(null); setFormValues(emptyUserForm); }} className="button-secondary">Cancel</button><button type="submit" className="button-primary">Save user</button></div>
                    </form>
                </AdminDialog>
            ) : null}
        </AdminLayout>
    );
}
