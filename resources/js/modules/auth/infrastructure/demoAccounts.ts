import type { DemoAccount } from '../domain/demoAccount';

export const demoAccounts: DemoAccount[] = [
    { id: 'admin-001', name: 'Haltev Admin', email: 'admin@haltev.demo', role: 'admin' },
    { id: 'user-001', name: 'Alex Morgan', email: 'alex@haltev.demo', role: 'user' },
    { id: 'user-002', name: 'Jamie Lee', email: 'jamie@haltev.demo', role: 'user' },
];

export const sharedDemoPassword = 'HaltevDemo123!';

export function findDemoAccount(accountId: string): DemoAccount | undefined {
    return demoAccounts.find((account) => account.id === accountId);
}

export function findDemoAccountByEmail(email: string): DemoAccount | undefined {
    const normalizedEmail = email.trim().toLowerCase();
    return demoAccounts.find((account) => account.email.toLowerCase() === normalizedEmail);
}
