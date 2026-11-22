import { Head } from '@inertiajs/react';
import AppLayout from '../../layouts/AppLayout';
import ProductDetails from '../../modules/products/presentation/ProductDetails';
import { findProductBySlug } from '../../modules/products/infrastructure/productCatalog';

type ProductShowProps = {
    productSlug: string;
};

export default function ProductShow({ productSlug }: ProductShowProps) {
    const product = findProductBySlug(productSlug);

    return (
        <AppLayout>
            <Head title={product ? product.name : 'Product not found'} />
            {product ? <ProductDetails product={product} /> : (
                <div className="page-container py-24 text-center">
                    <h1 className="text-3xl font-bold text-brand-navy">We couldn’t find that product.</h1>
                    <p className="mt-3 text-slate-500">Choose one of our available insurance products instead.</p>
                    <a href="/" className="button-primary mt-7">Back to products</a>
                </div>
            )}
        </AppLayout>
    );
}
