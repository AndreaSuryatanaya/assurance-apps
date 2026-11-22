import type { ApplicationHistoryRecord } from '../domain/applicationHistory';
import { mockApplicationHistory } from './mockApplicationHistory';

let applicationHistory: ApplicationHistoryRecord[] = [...mockApplicationHistory];
const listeners = new Set<() => void>();

export function subscribeToApplicationHistory(listener: () => void): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

export function getApplicationHistorySnapshot(): ApplicationHistoryRecord[] {
    return applicationHistory;
}

export function addApplicationToHistory(application: ApplicationHistoryRecord): void {
    applicationHistory = [application, ...applicationHistory];
    listeners.forEach((listener) => listener());
}

export function updateApplicationInHistory(referenceNumber: string, updates: Omit<ApplicationHistoryRecord, 'referenceNumber' | 'submittedAt'>): void {
    applicationHistory = applicationHistory.map((application) => application.referenceNumber === referenceNumber
        ? { ...application, ...updates }
        : application);
    listeners.forEach((listener) => listener());
}

export function deleteApplicationFromHistory(referenceNumber: string): void {
    applicationHistory = applicationHistory.filter((application) => application.referenceNumber !== referenceNumber);
    listeners.forEach((listener) => listener());
}
