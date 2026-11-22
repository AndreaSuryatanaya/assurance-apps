import { Link } from '@inertiajs/react';
import type { Product } from '../../domain/product';
import ProductIcon from './ProductIcon';

type ProductCardProps = {
    product: Product;
    index: number;
};

export default function ProductCard({ product, index }: ProductCardProps) {
    return (
        <article className="group flex min-h-[250px] flex-col rounded-card border border-slate-100 bg-white p-6 shadow-card transition duration-200 hover:-translate-y-1 hover:border-blue-100 hover:shadow-[0_12px_32px_rgba(15,35,70,0.09)]">
            <div className="mb-5 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue-soft text-brand-blue">
                    <ProductIcon name={product.icon} className="h-6 w-6" />
                </div>
                <span className="text-xs font-semibold tracking-[0.14em] text-slate-300">0{index + 1}</span>
            </div>
            <h3 className="text-lg font-semibold tracking-tight text-brand-navy">{product.name}</h3>
            <p className="mt-2 flex-1 text-sm leading-6 text-slate-500">{product.shortDescription}</p>
            <Link href={`/products/${product.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue transition group-hover:gap-3">
                View details <span aria-hidden="true">→</span>
            </Link>
        </article>
    );
}
