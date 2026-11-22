import { useSyncExternalStore } from 'react';
import { getApplicationHistorySnapshot, subscribeToApplicationHistory } from '../../infrastructure/inMemoryApplicationHistory';

export function useApplicationHistory() {
    return useSyncExternalStore(
        subscribeToApplicationHistory,
        getApplicationHistorySnapshot,
        getApplicationHistorySnapshot,
    );
}
