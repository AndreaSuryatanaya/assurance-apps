import { toast } from 'react-toastify';

type ConfirmToastOptions = {
    title: string;
    description: string;
    confirmLabel: string;
    tone?: 'danger' | 'success';
    onConfirm: () => void;
};

export function showConfirmToast({ title, description, confirmLabel, tone = 'danger', onConfirm }: ConfirmToastOptions): void {
    toast(({ closeToast }) => (
        <div className="w-full max-w-[22rem] p-1">
            <p className="font-semibold text-brand-navy">{title}</p>
            <p className="mt-1 text-sm leading-5 text-slate-600">{description}</p>
            <div className="mt-4 flex justify-end gap-2">
                <button type="button" onClick={closeToast} className="rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100">Cancel</button>
                <button type="button" onClick={() => { closeToast(); onConfirm(); }} className={`rounded-lg px-3 py-2 text-xs font-semibold text-white transition ${tone === 'danger' ? 'bg-rose-600 hover:bg-rose-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}>{confirmLabel}</button>
            </div>
        </div>
    ), {
        autoClose: false,
        closeButton: false,
        closeOnClick: false,
        draggable: false,
    });
}
