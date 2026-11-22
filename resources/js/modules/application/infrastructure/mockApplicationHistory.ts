import type { ApplicationHistoryRecord } from '../domain/applicationHistory';

export const mockApplicationHistory: ApplicationHistoryRecord[] = [
    { referenceNumber: 'HTV-2026-1001', accountId: 'user-001', applicantName: 'Alex Morgan', productSlug: 'motor-vehicle', productName: 'Motor Vehicle Insurance', submittedAt: '2026-11-13T09:15:00.000Z', status: 'submitted' },
    { referenceNumber: 'HTV-2026-1002', accountId: 'user-002', applicantName: 'Jamie Lee', productSlug: 'property', productName: 'Property Insurance', submittedAt: '2026-11-12T06:40:00.000Z', status: 'submitted' },
    { referenceNumber: 'HTV-2026-1003', accountId: 'user-003', applicantName: 'Taylor Smith', productSlug: 'marine', productName: 'Marine Insurance', submittedAt: '2026-11-11T03:20:00.000Z', status: 'submitted' },
    { referenceNumber: 'HTV-2026-1004', accountId: 'user-004', applicantName: 'Jordan Blake', productSlug: 'engineering', productName: 'Engineering Insurance', submittedAt: '2026-11-10T10:05:00.000Z', status: 'submitted' },
    { referenceNumber: 'HTV-2026-1005', accountId: 'user-001', applicantName: 'Alex Morgan', productSlug: 'mobile-phone', productName: 'Mobile Phone', submittedAt: '2026-11-09T08:30:00.000Z', status: 'submitted' },
    { referenceNumber: 'HTV-2026-1006', accountId: 'user-005', applicantName: 'Casey Jordan', productSlug: 'liability', productName: 'Liability Insurance', submittedAt: '2026-11-08T05:55:00.000Z', status: 'submitted' },
    { referenceNumber: 'HTV-2026-1007', accountId: 'user-006', applicantName: 'Morgan Ellis', productSlug: 'neon-sign', productName: 'Neon Sign', submittedAt: '2026-11-07T11:10:00.000Z', status: 'submitted' },
    { referenceNumber: 'HTV-2026-1008', accountId: 'user-002', applicantName: 'Jamie Lee', productSlug: 'business-interruption', productName: 'Business Interruption', submittedAt: '2026-11-06T07:25:00.000Z', status: 'submitted' },
    { referenceNumber: 'HTV-2026-1009', accountId: 'user-007', applicantName: 'Riley Parker', productSlug: 'property', productName: 'Property Insurance', submittedAt: '2026-11-05T02:45:00.000Z', status: 'submitted' },
    { referenceNumber: 'HTV-2026-1010', accountId: 'user-008', applicantName: 'Avery Quinn', productSlug: 'motor-vehicle', productName: 'Motor Vehicle Insurance', submittedAt: '2026-11-04T12:00:00.000Z', status: 'submitted' },
];
