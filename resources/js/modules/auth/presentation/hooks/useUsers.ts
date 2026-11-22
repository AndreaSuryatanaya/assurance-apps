import { useSyncExternalStore } from 'react';
import { getUsersSnapshot, subscribeToUsers } from '../../infrastructure/inMemoryUserDirectory';

export function useUsers() {
    return useSyncExternalStore(subscribeToUsers, getUsersSnapshot, getUsersSnapshot);
}
