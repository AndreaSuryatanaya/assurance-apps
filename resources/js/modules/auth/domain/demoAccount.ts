export type DemoRole = 'admin' | 'user';

export type DemoAccount = {
    id: string;
    name: string;
    email: string;
    role: DemoRole;
};
