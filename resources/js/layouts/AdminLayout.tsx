import { Link, router, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { signOutOfDemoAccount } from '../modules/auth/application/demoSessionStore';
import { ToastContainer } from 'react-toastify';

type AdminLayoutProps = {
    children: ReactNode;
};

const navigationItems = [
    { label: 'Overview', href: '/admin/dashboard', icon: 'overview' },
    { label: 'Submissions', href: '/admin/submissions', icon: 'submissions' },
    { label: 'Users', href: '/admin/users', icon: 'users' },
] as const;

function NavigationIcon({ name }: { name: (typeof navigationItems)[number]['icon'] }) {
    const paths = {
        overview: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
        submissions: <><path d="M8 4h11v17H5V4h3Z" /><path d="M8 2h5v4H8zM9 11h6M9 15h6" /></>,
        users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    };

    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">{paths[name]}</svg>;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const { url } = usePage();
    const [isMobileNavigationOpen, setIsMobileNavigationOpen] = useState(false);

    function handleSignOut() {
        signOutOfDemoAccount();
        router.visit('/');
    }

    const sidebar = (
        <aside className="flex h-full flex-col border-r border-slate-100 bg-white">
            <div className="flex h-[76px] items-center gap-3 border-b border-slate-100 px-5">
                <img src="/images/brand/haltev-logo.png" alt="" className="h-11 w-11 object-contain" />
                <div>
                    <p className="font-bold tracking-tight text-brand-navy">Haltev Insurrance</p>
                    <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.13em] text-slate-400">Admin workspace</p>
                </div>
            </div>

            <div className="px-4 pt-7">
                <p className="px-3 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">Management</p>
                <nav className="mt-3 space-y-1" aria-label="Admin navigation">
                    {navigationItems.map((item) => {
                        const isActive = item.href === '/admin/dashboard'
                            ? url === item.href || url.startsWith(`${item.href}?`)
                            : url.startsWith(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsMobileNavigationOpen(false)}
                                aria-current={isActive ? 'page' : undefined}
                                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${isActive ? 'bg-brand-blue-soft text-brand-blue' : 'text-slate-600 hover:bg-surface-muted hover:text-brand-navy'}`}
                            >
                                <NavigationIcon name={item.icon} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="mt-auto border-t border-slate-100 p-4">
                <Link href="/" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-600 transition hover:bg-surface-muted hover:text-brand-navy">
                    <span aria-hidden="true">↗</span> View public site
                </Link>
                <button type="button" onClick={handleSignOut} className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-slate-500 transition hover:bg-rose-50 hover:text-rose-700">
                    <span aria-hidden="true">↪</span> Sign out
                </button>
            </div>
        </aside>
    );

    return (
        <div className="min-h-screen bg-surface-muted text-slate-800 lg:flex">
            <div className="fixed inset-y-0 left-0 z-40 hidden w-64 lg:block">{sidebar}</div>

            {isMobileNavigationOpen && <button type="button" aria-label="Close admin navigation" onClick={() => setIsMobileNavigationOpen(false)} className="fixed inset-0 z-40 bg-brand-navy/30 lg:hidden" />}
            <div className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] transition-transform duration-200 lg:hidden ${isMobileNavigationOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {sidebar}
            </div>

            <div className="min-h-screen min-w-0 flex-1 lg:ml-64">
                <header className="sticky top-0 z-30 flex h-[68px] items-center justify-between border-b border-slate-100 bg-white/95 px-4 backdrop-blur lg:hidden">
                    <button type="button" aria-label="Open admin navigation" aria-expanded={isMobileNavigationOpen} onClick={() => setIsMobileNavigationOpen(true)} className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-brand-navy">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
                    </button>
                    <span className="text-sm font-semibold text-brand-navy">Admin workspace</span>
                    <span className="w-10" aria-hidden="true" />
                </header>
                <main className="mx-auto w-full max-w-[1440px] px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">{children}</main>
            </div>
            <ToastContainer position="top-right" autoClose={4000} closeOnClick={false} pauseOnHover newestOnTop theme="light" />
        </div>
    );
}
