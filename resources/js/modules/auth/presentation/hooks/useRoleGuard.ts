import { router } from '@inertiajs/react';
import { useEffect } from 'react';
import type { DemoRole } from '../../domain/demoAccount';
import { useDemoSession } from './useDemoSession';

export function getDashboardPath(role: DemoRole): string {
    return role === 'admin' ? '/admin/dashboard' : '/dashboard';
}

export function getSafeApplicationPath(path: string | null): string | null {
    if (!path || !path.startsWith('/apply/') || path.startsWith('//')) return null;
    return path;
}

export function useRoleGuard(requiredRole: DemoRole): boolean {
    const { currentAccount } = useDemoSession();

    useEffect(() => {
        if (currentAccount?.role === requiredRole) return;

        if (currentAccount) {
            router.visit(getDashboardPath(currentAccount.role));
            return;
        }

        const currentPath = `${window.location.pathname}${window.location.search}`;
        const nextPath = getSafeApplicationPath(currentPath);
        const loginPath = nextPath
            ? `/login?next=${encodeURIComponent(nextPath)}`
            : '/login';

        router.visit(loginPath);
    }, [currentAccount, requiredRole]);

    return currentAccount?.role === requiredRole;
}
