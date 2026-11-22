import { Link, router } from '@inertiajs/react';
import { useState, type ReactNode } from 'react';
import { signOutOfDemoAccount } from '../modules/auth/application/demoSessionStore';
import { useDemoSession } from '../modules/auth/presentation/hooks/useDemoSession';

type AppLayoutProps = {
    children: ReactNode;
    showHeader?: boolean;
    showFooter?: boolean;
};

export default function AppLayout({ children, showHeader = true, showFooter = true }: AppLayoutProps) {
    const { currentAccount } = useDemoSession();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    function handleSignOut() {
        signOutOfDemoAccount();
        router.visit('/');
    }

    return (
        <div className="min-h-screen bg-white text-slate-800">
            {showHeader && <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/95 backdrop-blur">
                <div className="page-container flex h-[76px] items-center justify-between gap-4">
                    <Link href="/" className="flex items-center gap-3" aria-label="Haltev Insurrance home">
                        <img src="/images/brand/haltev-logo.png" alt="" className="h-11 w-11 shrink-0 object-contain sm:h-12 sm:w-12" />
                        <span className="text-sm font-bold tracking-tight text-brand-navy sm:text-base">Haltev Insurrance</span>
                    </Link>
                    <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 lg:flex" aria-label="Main navigation">
                        <Link href="/#products" className="transition hover:text-brand-blue">Insurance products</Link>
                        <Link href="/#how-it-works" className="transition hover:text-brand-blue">How it works</Link>
                        <Link href="/#about" className="transition hover:text-brand-blue">About us</Link>
                    </nav>
                    <div className="hidden items-center gap-2 lg:flex">
                        {currentAccount ? (
                            <>
                                <Link href={currentAccount.role === 'admin' ? '/admin/dashboard' : '/dashboard'} className="button-secondary px-3 py-2 text-xs sm:px-4 sm:text-sm">
                                    {currentAccount.role === 'admin' ? 'Admin dashboard' : 'My applications'}
                                </Link>
                                <button type="button" onClick={handleSignOut} className="rounded-xl px-2 py-2 text-xs font-semibold text-slate-500 hover:bg-surface-muted hover:text-brand-navy sm:px-3 sm:text-sm">Sign out</button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="button-secondary px-3 py-2 text-xs sm:px-4 sm:text-sm">Sign in</Link>
                                <Link href="/#products" className="button-primary px-3 py-2 text-xs sm:px-5 sm:text-sm">Explore products</Link>
                            </>
                        )}
                    </div>
                    <button
                        type="button"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-brand-navy transition hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 lg:hidden"
                        aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                        aria-expanded={isMobileMenuOpen}
                        aria-controls="mobile-navigation"
                        onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
                    >
                        {isMobileMenuOpen ? (
                            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                <path d="m18 6-12 12M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                <path d="M4 7h16M4 12h16M4 17h16" />
                            </svg>
                        )}
                    </button>
                </div>
                {isMobileMenuOpen && <div id="mobile-navigation" className="border-t border-slate-100 bg-white shadow-card lg:hidden">
                    <nav className="page-container flex flex-col gap-1 py-3 text-sm font-medium text-slate-600" aria-label="Mobile navigation">
                        <Link href="/#products" onClick={() => setIsMobileMenuOpen(false)} className="rounded-xl px-3 py-3 transition hover:bg-surface-muted hover:text-brand-blue">Insurance products</Link>
                        <Link href="/#how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="rounded-xl px-3 py-3 transition hover:bg-surface-muted hover:text-brand-blue">How it works</Link>
                        <Link href="/#about" onClick={() => setIsMobileMenuOpen(false)} className="rounded-xl px-3 py-3 transition hover:bg-surface-muted hover:text-brand-blue">About us</Link>
                        <div className="mt-2 grid gap-2 border-t border-slate-100 pt-3">
                            {currentAccount ? (
                                <>
                                    <Link href={currentAccount.role === 'admin' ? '/admin/dashboard' : '/dashboard'} onClick={() => setIsMobileMenuOpen(false)} className="button-secondary w-full justify-center">
                                        {currentAccount.role === 'admin' ? 'Admin dashboard' : 'My applications'}
                                    </Link>
                                    <button type="button" onClick={() => { setIsMobileMenuOpen(false); handleSignOut(); }} className="w-full rounded-xl px-4 py-3 text-sm font-semibold text-slate-500 transition hover:bg-surface-muted hover:text-brand-navy">Sign out</button>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="button-secondary w-full justify-center">Sign in</Link>
                                    <Link href="/#products" onClick={() => setIsMobileMenuOpen(false)} className="button-primary w-full justify-center">Explore products</Link>
                                </>
                            )}
                        </div>
                    </nav>
                </div>}
            </header>}
            <main>{children}</main>
            {showFooter && <footer className="mt-20 bg-brand-navy text-white">
                <div className="page-container grid gap-8 py-12 sm:grid-cols-[1fr_auto] sm:items-center">
                    <div className="flex items-center gap-3">
                        <img src="/images/brand/haltev-logo.png" alt="" className="h-12 w-12 rounded-xl bg-white object-contain p-1" />
                        <div>
                            <p className="font-semibold">Haltev Insurrance</p>
                            <p className="mt-1 text-sm text-blue-100">Clear choices. Confident next steps.</p>
                        </div>
                    </div>
                    <p className="max-w-md text-sm leading-6 text-blue-100">This website is a product application demo. Submissions are simulated and do not create an insurance policy.</p>
                </div>
                <div className="border-t border-white/10">
                    <div className="page-container py-4 text-xs text-blue-200">© {new Date().getFullYear()} Haltev Insurrance · Demo experience</div>
                </div>
            </footer>}
        </div>
    );
}
