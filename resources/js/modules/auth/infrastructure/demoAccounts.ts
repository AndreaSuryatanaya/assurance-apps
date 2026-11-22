import type { DemoAccount } from '../domain/demoAccount';
import { getUsersSnapshot } from './inMemoryUserDirectory';

const adminAccount: DemoAccount = { id: 'admin-001', name: 'Haltev Admin', email: 'admin@haltev.demo', role: 'admin' };

export function getDemoAccounts(): DemoAccount[] {
    return [adminAccount, ...getUsersSnapshot().filter((user) => user.status === 'active').map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: 'user' as const,
    }))];
}

export const sharedDemoPassword = 'HaltevDemo123!';

export function findDemoAccount(accountId: string): DemoAccount | undefined {
    return getDemoAccounts().find((account) => account.id === accountId);
}

export function findDemoAccountByEmail(email: string): DemoAccount | undefined {
    const normalizedEmail = email.trim().toLowerCase();
    return getDemoAccounts().find((account) => account.email.toLowerCase() === normalizedEmail);
}
