export enum UserRole {
    ADMIN = 'ADMIN',
    CUSTOMER = 'CUSTOMER'
}

export interface User {
    id: string;
    username: string;
    email: string;
    role: UserRole;
    fullName: string;
    phone?: string;
    createdAt: Date;
}

export interface LoginCredentials {
    username: string;
    password: string;
    role: UserRole;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    token?: string;
}
