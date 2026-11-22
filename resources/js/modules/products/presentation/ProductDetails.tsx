import { Link } from '@inertiajs/react';
import type { Product } from '../domain/product';
import ProductIcon from './components/ProductIcon';
import { useDemoSession } from '../../auth/presentation/hooks/useDemoSession';

type ProductDetailsProps = {
    product: Product;
};

export default function ProductDetails({ product }: ProductDetailsProps) {
    const { currentAccount } = useDemoSession();
    const applicationPath = `/apply/${product.slug}`;
    const startApplicationPath = currentAccount
        ? applicationPath
        : `/login?next=${encodeURIComponent(applicationPath)}`;

    return (
        <div className="page-container pb-20 pt-12 sm:pt-16">
            <Link href="/#products" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:text-brand-navy"><span aria-hidden="true">←</span> All products</Link>
            <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
                <div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-blue-soft text-brand-blue"><ProductIcon name={product.icon} className="h-7 w-7" /></div>
                    <p className="mt-7 text-sm font-semibold uppercase tracking-[0.16em] text-brand-blue">Insurance product</p>
                    <h1 className="mt-3 max-w-2xl text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl">{product.name}</h1>
                    <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{product.description}</p>
                    {currentAccount?.role === 'admin' ? (
                        <p className="mt-8 rounded-xl bg-brand-blue-soft px-5 py-4 text-sm text-brand-navy">Sign in as a user demo account to start an application.</p>
                    ) : (
                        <Link href={startApplicationPath} className="button-primary mt-8">Start application <span aria-hidden="true">→</span></Link>
                    )}
                    <p className="mt-4 text-xs leading-5 text-slate-400">Demo experience. Product information is illustrative and is not policy wording.</p>
                </div>
                <div className="rounded-feature bg-brand-blue-soft p-7 sm:p-9">
                    <p className="text-sm font-semibold text-brand-navy">What you’ll do</p>
                    <ul className="mt-6 space-y-5">
                        {product.details.map((detail, index) => (
                            <li key={detail} className="flex gap-4">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-brand-blue">0{index + 1}</span>
                                <span className="pt-1 text-sm leading-6 text-slate-600">{detail}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-8 rounded-2xl border border-white bg-white/80 p-5">
                        <p className="text-sm font-semibold text-brand-navy">A simple, guided process</p>
                        <p className="mt-2 text-sm leading-6 text-slate-500">Your information stays in memory during this demo session and is cleared when you refresh the page.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
