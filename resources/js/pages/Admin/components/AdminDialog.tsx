import type { ReactNode } from 'react';

type AdminDialogProps = {
    title: string;
    description?: string;
    onClose: () => void;
    children: ReactNode;
    size?: 'regular' | 'wide';
};

export default function AdminDialog({ title, description, onClose, children, size = 'regular' }: AdminDialogProps) {
    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-brand-navy/40 p-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
            <section role="dialog" aria-modal="true" aria-labelledby="admin-dialog-title" className={`max-h-[92vh] w-full overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8 ${size === 'wide' ? 'max-w-3xl' : 'max-w-xl'}`}>
                <div className="flex items-start justify-between gap-4">
                    <div><h2 id="admin-dialog-title" className="text-xl font-bold text-brand-navy sm:text-2xl">{title}</h2>{description && <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>}</div>
                    <button type="button" aria-label="Close dialog" onClick={onClose} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-muted text-slate-500 transition hover:bg-slate-200">×</button>
                </div>
                <div className="mt-6">{children}</div>
            </section>
        </div>
    );
}
