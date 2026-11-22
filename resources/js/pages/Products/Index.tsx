import { Head } from '@inertiajs/react';
import AppLayout from '../../layouts/AppLayout';
import ProductCard from '../../modules/products/presentation/components/ProductCard';
import { productCatalog } from '../../modules/products/infrastructure/productCatalog';

export default function ProductsIndex() {
    return (
        <AppLayout>
            <Head title="Insurance made clearer" />
            <section className="page-container grid gap-10 py-10 sm:py-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-20">
                <div className="max-w-xl">
                    <span className="eyebrow"><span className="h-2 w-2 rounded-full bg-brand-cyan" /> Protection for what matters</span>
                    <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-brand-navy sm:text-5xl lg:text-[58px]">Choose cover with <span className="text-brand-blue">confidence.</span></h1>
                    <p className="mt-6 max-w-lg text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">Explore insurance options and start an application in a few clear steps. We’ll guide you through the details along the way.</p>
                    <div className="mt-8 flex flex-wrap items-center gap-4">
                        <a href="#products" className="button-primary">Explore products <span aria-hidden="true">→</span></a>
                        <a href="#how-it-works" className="button-secondary">See how it works</a>
                    </div>
                    <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-500">
                        <span className="flex items-center gap-2"><span className="text-brand-blue">✓</span> Guided application</span>
                        <span className="flex items-center gap-2"><span className="text-brand-blue">✓</span> Clear next steps</span>
                    </div>
                </div>
                <div className="relative">
                    <div className="absolute -left-5 -top-5 h-32 w-32 rounded-full bg-brand-blue-soft blur-2xl" />
                    <div className="relative overflow-hidden rounded-feature bg-brand-blue-soft p-2 shadow-card sm:p-3">
                        <img src="/images/marketing/insurance-advisors.jpeg" alt="Insurance advisors discussing coverage with a customer" className="h-[320px] w-full rounded-[20px] object-cover sm:h-[420px] lg:h-[500px]" />
                        <div className="absolute bottom-7 left-7 right-7 rounded-2xl border border-white/70 bg-white/95 p-4 shadow-card backdrop-blur sm:bottom-9 sm:left-9 sm:right-auto sm:max-w-[300px] sm:p-5">
                            <p className="text-sm font-semibold text-brand-navy">A little more clarity</p>
                            <p className="mt-1 text-xs leading-5 text-slate-500">A guided application designed around your needs.</p>
                        </div>
                    </div>
                    <div className="absolute -bottom-5 -right-3 hidden rounded-2xl border border-blue-50 bg-white px-5 py-4 shadow-card sm:block">
                        <p className="text-xs text-slate-500">Simple application</p>
                        <p className="mt-1 font-semibold text-brand-navy">One step at a time</p>
                    </div>
                </div>
            </section>

            <section id="about" className="scroll-mt-24 border-y border-slate-100 bg-surface-muted py-16 sm:py-20">
                <div className="page-container grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-stretch">
                    <div className="flex flex-col justify-center">
                        <span className="eyebrow">About Haltev</span>
                        <h2 className="mt-4 text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">Insurance should feel easier to understand.</h2>
                        <p className="mt-5 max-w-xl leading-7 text-slate-600">Haltev Insurrance is built around a simple idea: people make more confident choices when protection is explained clearly. We make it easier to explore coverage and take the next step at your own pace.</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <article className="rounded-feature border border-blue-100 bg-white p-6 shadow-card sm:p-7">
                            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-blue-soft text-lg font-bold text-brand-blue" aria-hidden="true">◎</span>
                            <p className="mt-5 text-sm font-semibold text-brand-blue">Our vision</p>
                            <h3 className="mt-2 text-xl font-bold leading-7 text-brand-navy">A future where everyone can choose protection with confidence.</h3>
                            <p className="mt-3 text-sm leading-6 text-slate-500">We want insurance to feel more approachable, with clear information that helps people understand their options.</p>
                        </article>
                        <article className="rounded-feature bg-brand-navy p-6 text-white shadow-card sm:p-7">
                            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-lg font-bold text-brand-cyan" aria-hidden="true">✓</span>
                            <p className="mt-5 text-sm font-semibold text-brand-cyan">Our mission</p>
                            <h3 className="mt-2 text-xl font-bold leading-7">Make every step feel clear and guided.</h3>
                            <ul className="mt-4 space-y-3 text-sm leading-6 text-blue-100">
                                <li className="flex gap-2"><span className="text-brand-cyan">✓</span><span>Explain coverage choices in straightforward language.</span></li>
                                <li className="flex gap-2"><span className="text-brand-cyan">✓</span><span>Guide applicants through a simple, thoughtful process.</span></li>
                                <li className="flex gap-2"><span className="text-brand-cyan">✓</span><span>Keep the next step visible at every stage.</span></li>
                            </ul>
                        </article>
                    </div>
                </div>
            </section>

            <section id="products" className="scroll-mt-24 bg-surface-muted py-16 sm:py-20">
                <div className="page-container">
                    <div className="mx-auto max-w-2xl text-center">
                        <span className="eyebrow justify-center">Our insurance products</span>
                        <h2 className="mt-4 text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">Protection for different parts of life</h2>
                        <p className="mt-4 leading-7 text-slate-500">Choose a category to learn more. Each application starts with a few simple questions.</p>
                    </div>
                    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {productCatalog.map((product, index) => <ProductCard key={product.slug} product={product} index={index} />)}
                    </div>
                </div>
            </section>

            <section id="how-it-works" className="page-container scroll-mt-24 py-16 sm:py-20">
                <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
                    <div>
                        <span className="eyebrow">A clear process</span>
                        <h2 className="mt-4 text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">From choosing a product to submitting an application.</h2>
                    </div>
                    <p className="max-w-xl leading-7 text-slate-500 lg:justify-self-end">The guided flow helps you share the information needed for your selected product, review the details, and submit your application.</p>
                </div>
                <div className="mt-9 grid gap-4 md:grid-cols-3">
                    {[
                        ['01', 'Choose a product', 'Compare categories and select the cover you want to explore.'],
                        ['02', 'Share your details', 'Complete a short form with questions tailored to your selection.'],
                        ['03', 'Review and submit', 'Check your information before sending your demo application.'],
                    ].map(([number, title, description]) => (
                        <div className="rounded-card border border-slate-100 bg-white p-6" key={number}>
                            <span className="text-sm font-bold text-brand-cyan">{number}</span>
                            <h3 className="mt-4 font-semibold text-brand-navy">{title}</h3>
                            <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
                        </div>
                    ))}
                </div>
            </section>

        </AppLayout>
    );
}
