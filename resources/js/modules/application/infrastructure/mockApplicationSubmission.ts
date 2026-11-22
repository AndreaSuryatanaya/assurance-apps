import type { ApplicationSubmissionGateway } from '../application/applicationSubmissionGateway';
import type { ApplicationSubmission, InsuranceApplicationDraft } from '../domain/insuranceApplication';

export const mockApplicationSubmission: ApplicationSubmissionGateway = {
    async submit(_draft: InsuranceApplicationDraft, _productName: string): Promise<ApplicationSubmission> {
        await new Promise((resolve) => window.setTimeout(resolve, 650));
        const suffix = Math.random().toString(36).slice(2, 8).toUpperCase();
        return { referenceNumber: `HTV-${new Date().getFullYear()}-${suffix}`, status: 'submitted' };
    },
};
