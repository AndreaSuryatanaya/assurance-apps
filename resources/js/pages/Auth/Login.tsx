import { Head, Link, router } from '@inertiajs/react';
import { useEffect, useState, type FormEvent } from 'react';
import AppLayout from '../../layouts/AppLayout';
import { signInToDemoAccount } from '../../modules/auth/application/demoSessionStore';
import { demoAccounts, findDemoAccountByEmail, sharedDemoPassword } from '../../modules/auth/infrastructure/demoAccounts';
import { useDemoSession } from '../../modules/auth/presentation/hooks/useDemoSession';
import { getDashboardPath, getSafeApplicationPath } from '../../modules/auth/presentation/hooks/useRoleGuard';

export default function Login() {
    const { currentAccount } = useDemoSession();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);

    useEffect(() => {
        if (!currentAccount) return;

        const requestedPath = new URLSearchParams(window.location.search).get('next');
        const applicationPath = currentAccount.role === 'user' ? getSafeApplicationPath(requestedPath) : null;

        if (applicationPath) {
            router.visit(applicationPath);
            return;
        }

        router.visit(getDashboardPath(currentAccount.role));
    }, [currentAccount]);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const account = findDemoAccountByEmail(email);

        if (!account || password !== sharedDemoPassword) {
            setError('The email address or password is incorrect.');
            return;
        }

        setIsSigningIn(true);
        signInToDemoAccount(account.id);
    }

    return (
        <AppLayout showHeader={false} showFooter={false}>
            <Head title="Sign in to your demo account" />
            <section className="page-container py-8 sm:py-12 lg:py-16">
                <div className="mx-auto grid max-w-5xl overflow-hidden rounded-feature border border-slate-100 bg-white shadow-card lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="relative h-56 overflow-hidden bg-brand-navy sm:h-64 lg:h-auto lg:min-h-[680px]">
                        <img src="/images/auth/login-team.webp" alt="Colleagues celebrating a shared achievement" className="absolute inset-0 h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/20 to-transparent" />
                        <div className="absolute bottom-0 p-5 text-white lg:p-9 xl:p-12">
                            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-200">A clearer way forward</p>
                            <h1 className="mt-4 text-3xl font-bold leading-tight xl:text-4xl">Protection starts with a confident next step.</h1>
                            <p className="mt-4 hidden max-w-sm text-sm leading-6 text-blue-50/90 sm:block">Sign in to continue your insurance application or review your demo submissions.</p>
                        </div>
                    </div>

                    <div className="p-6 sm:p-9 lg:p-10 xl:p-12">
                        <Link href="/" className="text-sm font-semibold text-brand-blue hover:text-brand-navy">← Back to products</Link>
                        <div className="mt-8">
                            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-blue">Welcome to Haltev</p>
                            <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-navy">Sign in</h2>
                            <p className="mt-3 text-sm leading-6 text-slate-500">Use one of the demo email addresses listed below. All demo accounts share the same password.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                            <div>
                                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-brand-navy">Email address</label>
                                <input id="email" name="email" type="email" autoComplete="username" required value={email} onChange={(event) => { setEmail(event.target.value); setError(''); }} placeholder="you@example.com" className="form-control" />
                            </div>
                            <div>
                                <label htmlFor="password" className="mb-2 block text-sm font-semibold text-brand-navy">Password</label>
                                <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={(event) => { setPassword(event.target.value); setError(''); }} placeholder="Enter your password" className="form-control" />
                            </div>
                            {error && <p role="alert" className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}
                            <button type="submit" disabled={isSigningIn} className="button-primary w-full disabled:cursor-wait disabled:opacity-60">
                                {isSigningIn ? 'Signing in…' : 'Sign in'} <span aria-hidden="true">→</span>
                            </button>
                        </form>

                        <div className="mt-8 rounded-2xl border border-blue-100 bg-brand-blue-soft/50 p-5">
                            <h3 className="font-semibold text-brand-navy">Demo account information</h3>
                            <p className="mt-2 text-sm text-slate-600">Shared password: <code className="rounded-md bg-white px-2 py-1 font-semibold text-brand-navy">{sharedDemoPassword}</code></p>
                            <ul className="mt-4 space-y-3">
                                {demoAccounts.map((account) => (
                                    <li key={account.id} className="flex flex-col gap-1 border-t border-blue-100 pt-3 text-sm sm:flex-row sm:items-center sm:justify-between">
                                        <span><span className="font-semibold text-brand-navy">{account.role === 'admin' ? 'Admin' : 'User'}</span><span className="mx-2 text-slate-300">·</span><span className="text-slate-600">{account.email}</span></span>
                                        <span className="text-xs text-slate-500">{account.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <p className="mt-5 rounded-xl bg-surface-muted px-4 py-3 text-xs leading-5 text-slate-600">Demo sign-in only. Your account and application history are kept in memory and cleared when this page is refreshed.</p>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
