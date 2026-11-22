export type ApplicantInformation = {
    fullName: string;
    email: string;
    phone: string;
    address: string;
};

export type CoverageInformation = {
    coverageOption: string;
    startDate: string;
    endDate: string;
    requestedAmount: string;
    coverageNotes: string;
};

export type InsuranceApplicationDraft = {
    applicant: ApplicantInformation;
    insuredItem: Record<string, string>;
    coverage: CoverageInformation;
    documentNames: string[];
    accuracyConfirmed: boolean;
};

export type ApplicationSubmission = {
    referenceNumber: string;
    status: 'submitted';
};

export function createApplicationDraft(): InsuranceApplicationDraft {
    return {
        applicant: { fullName: '', email: '', phone: '', address: '' },
        insuredItem: {},
        coverage: { coverageOption: '', startDate: '', endDate: '', requestedAmount: '', coverageNotes: '' },
        documentNames: [],
        accuracyConfirmed: false,
    };
}
