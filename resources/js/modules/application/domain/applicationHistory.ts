import type { InsuranceApplicationDraft } from './insuranceApplication';

export type ApplicationStatus = 'submitted' | 'under_review' | 'needs_information';

export type ApplicationHistoryRecord = {
    referenceNumber: string;
    accountId: string;
    applicantName: string;
    productSlug: string;
    productName: string;
    submittedAt: string;
    status: ApplicationStatus;
    details?: InsuranceApplicationDraft;
};
