import type { ApplicationSubmission, InsuranceApplicationDraft } from '../domain/insuranceApplication';

export interface ApplicationSubmissionGateway {
    submit(draft: InsuranceApplicationDraft, productName: string): Promise<ApplicationSubmission>;
}
