import { Link, router } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { signOutOfDemoAccount } from '../modules/auth/application/demoSessionStore';
import { useDemoSession } from '../modules/auth/presentation/hooks/useDemoSession';

type AppLayoutProps = {
    children: ReactNode;
    showHeader?: boolean;
    showFooter?: boolean;
};

export default function AppLayout({ children, showHeader = true, showFooter = true }: AppLayoutProps) {
    const { currentAccount } = useDemoSession();

    function handleSignOut() {
        signOutOfDemoAccount();
        router.visit('/');
    }

    return (
        <div className="min-h-screen bg-white text-slate-800">
            {showHeader && <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/95 backdrop-blur">
                <div className="page-container flex h-[76px] items-center justify-between gap-4">
                    <Link href="/" className="flex items-center gap-3" aria-label="Haltev Insurrance home">
                        <img src="/images/brand/haltev-logo.png" alt="" className="h-12 w-12 object-contain" />
                        <span className="text-[15px] font-bold tracking-tight text-brand-navy sm:text-base">Haltev Insurrance</span>
                    </Link>
                    <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex" aria-label="Main navigation">
                        <Link href="/#products" className="transition hover:text-brand-blue">Insurance products</Link>
                        <Link href="/#how-it-works" className="transition hover:text-brand-blue">How it works</Link>
                        <Link href="/#about" className="transition hover:text-brand-blue">About us</Link>
                    </nav>
                    <div className="flex items-center gap-2">
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
                </div>
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
