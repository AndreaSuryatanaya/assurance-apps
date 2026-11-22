import type { ApplicationSubmissionGateway } from './applicationSubmissionGateway';
import type { ApplicationSubmission, InsuranceApplicationDraft } from '../domain/insuranceApplication';

export function submitApplication(
    draft: InsuranceApplicationDraft,
    productName: string,
    gateway: ApplicationSubmissionGateway,
): Promise<ApplicationSubmission> {
    return gateway.submit(draft, productName);
}
