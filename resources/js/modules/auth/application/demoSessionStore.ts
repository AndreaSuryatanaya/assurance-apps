import type { DemoAccount } from '../domain/demoAccount';
import { findDemoAccount } from '../infrastructure/demoAccounts';

export type DemoSessionState = {
    currentAccount: DemoAccount | null;
};

let sessionState: DemoSessionState = { currentAccount: null };

const listeners = new Set<() => void>();

export function subscribeToDemoSession(listener: () => void): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

export function getDemoSessionSnapshot(): DemoSessionState {
    return sessionState;
}

export function signInToDemoAccount(accountId: string): DemoAccount | null {
    const account = findDemoAccount(accountId);

    if (!account) return null;

    sessionState = { currentAccount: account };
    notifyListeners();

    return account;
}

export function signOutOfDemoAccount(): void {
    sessionState = { currentAccount: null };
    notifyListeners();
}

function notifyListeners(): void {
    listeners.forEach((listener) => listener());
}
