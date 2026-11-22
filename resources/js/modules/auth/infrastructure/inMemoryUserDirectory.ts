import type { DemoUserRecord } from '../domain/demoUserRecord';
import { mockUsers } from './mockUsers';

let users: DemoUserRecord[] = [...mockUsers];
const listeners = new Set<() => void>();

export function subscribeToUsers(listener: () => void): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

export function getUsersSnapshot(): DemoUserRecord[] {
    return users;
}

export function findUserById(userId: string): DemoUserRecord | undefined {
    return users.find((user) => user.id === userId);
}

export function createUser(user: DemoUserRecord): void {
    users = [user, ...users];
    notifyListeners();
}

export function updateUser(userId: string, updates: Omit<DemoUserRecord, 'id'>): void {
    users = users.map((user) => user.id === userId ? { ...user, ...updates } : user);
    notifyListeners();
}

export function deleteUser(userId: string): void {
    users = users.filter((user) => user.id !== userId);
    notifyListeners();
}

function notifyListeners(): void {
    listeners.forEach((listener) => listener());
}
