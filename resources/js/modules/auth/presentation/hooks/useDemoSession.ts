import { useSyncExternalStore } from 'react';
import { getDemoSessionSnapshot, subscribeToDemoSession } from '../../application/demoSessionStore';

export function useDemoSession() {
    return useSyncExternalStore(
        subscribeToDemoSession,
        getDemoSessionSnapshot,
        getDemoSessionSnapshot,
    );
}
