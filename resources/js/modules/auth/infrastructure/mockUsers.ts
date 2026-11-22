import type { DemoUserRecord } from '../domain/demoUserRecord';

export const mockUsers: DemoUserRecord[] = [
    { id: 'user-001', name: 'Alex Morgan', email: 'alex@haltev.demo', status: 'active', joinedAt: '2026-01-12' },
    { id: 'user-002', name: 'Jamie Lee', email: 'jamie@haltev.demo', status: 'active', joinedAt: '2026-02-03' },
    { id: 'user-003', name: 'Taylor Smith', email: 'taylor.smith@example.com', status: 'active', joinedAt: '2026-02-18' },
    { id: 'user-004', name: 'Jordan Blake', email: 'jordan.blake@example.com', status: 'active', joinedAt: '2026-03-05' },
    { id: 'user-005', name: 'Casey Jordan', email: 'casey.jordan@example.com', status: 'inactive', joinedAt: '2026-03-21' },
    { id: 'user-006', name: 'Morgan Ellis', email: 'morgan.ellis@example.com', status: 'active', joinedAt: '2026-04-09' },
    { id: 'user-007', name: 'Riley Parker', email: 'riley.parker@example.com', status: 'active', joinedAt: '2026-05-14' },
    { id: 'user-008', name: 'Avery Quinn', email: 'avery.quinn@example.com', status: 'inactive', joinedAt: '2026-06-02' },
    { id: 'user-009', name: 'Cameron Reed', email: 'cameron.reed@example.com', status: 'active', joinedAt: '2026-07-19' },
    { id: 'user-010', name: 'Drew Bennett', email: 'drew.bennett@example.com', status: 'active', joinedAt: '2026-08-26' },
];

export function findMockUserById(userId: string): DemoUserRecord | undefined {
    return mockUsers.find((user) => user.id === userId);
}
