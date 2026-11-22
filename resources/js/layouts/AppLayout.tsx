import { Link } from '@inertiajs/react';
import type { ReactNode } from 'react';

type AppLayoutProps = {
    children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="min-h-screen bg-white text-slate-800">
            <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/95 backdrop-blur">
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
                    <Link href="/#products" className="button-primary hidden px-5 py-2.5 text-sm sm:inline-flex">Explore products</Link>
                    <Link href="/#products" className="button-primary px-4 py-2.5 text-xs sm:hidden">Explore</Link>
                </div>
            </header>
            <main>{children}</main>
            <footer className="mt-20 bg-brand-navy text-white">
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
            </footer>
        </div>
    );
}
