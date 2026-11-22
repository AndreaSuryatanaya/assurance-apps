type StepIndicatorProps = {
    currentStep: number;
    steps: string[];
};

export default function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
    return (
        <ol className="grid grid-cols-5 gap-2" aria-label="Application progress">
            {steps.map((step, index) => {
                const isComplete = index < currentStep;
                const isCurrent = index === currentStep;
                return (
                    <li key={step} className="min-w-0">
                        <div className={`mb-2 h-1.5 rounded-full ${isComplete || isCurrent ? 'bg-brand-blue' : 'bg-slate-100'}`} />
                        <span className={`hidden text-xs sm:block ${isCurrent ? 'font-semibold text-brand-navy' : 'text-slate-400'}`} aria-current={isCurrent ? 'step' : undefined}>{step}</span>
                        <span className={`text-xs sm:hidden ${isCurrent ? 'font-semibold text-brand-navy' : 'text-slate-400'}`}>{index + 1}</span>
                    </li>
                );
            })}
        </ol>
    );
}
