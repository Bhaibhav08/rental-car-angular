import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, UserRole, LoginCredentials, AuthState } from '../models/user.model';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly router = inject(Router);
    private readonly storage = inject(StorageService);

    private readonly AUTH_KEY = 'rental_car_auth';
    private authState$ = new BehaviorSubject<AuthState>({
        user: null,
        isAuthenticated: false
    });

    // Mock users for demo
    private mockUsers: User[] = [
        {
            id: 'admin1',
            username: 'admin',
            email: 'admin@rentalcar.com',
            role: UserRole.ADMIN,
            fullName: 'Admin User',
            phone: '+91 9876543210',
            createdAt: new Date('2024-01-01')
        },
        {
            id: 'customer1',
            username: 'customer',
            email: 'customer@example.com',
            role: UserRole.CUSTOMER,
            fullName: 'Arjun Sharma',
            phone: '+91 9876543211',
            createdAt: new Date('2024-06-15')
        }
    ];

    constructor() {
        this.loadAuthState();
    }

    getAuthState(): Observable<AuthState> {
        return this.authState$.asObservable();
    }

    getCurrentUser(): User | null {
        return this.authState$.value.user;
    }

    isAuthenticated(): boolean {
        return this.authState$.value.isAuthenticated;
    }

    getUserRole(): UserRole | null {
        return this.authState$.value.user?.role || null;
    }

    login(credentials: LoginCredentials): boolean {
        // In real app, this would make HTTP request to backend
        // For demo, we'll use mock authentication
        const user = this.mockUsers.find(
            u => u.username === credentials.username && u.role === credentials.role
        );

        if (user) {
            const authState: AuthState = {
                user,
                isAuthenticated: true,
                token: this.generateMockToken()
            };

            this.authState$.next(authState);
            this.storage.setItem(this.AUTH_KEY, authState);

            // Navigate based on role
            if (user.role === UserRole.ADMIN) {
                this.router.navigate(['/admin/dashboard']);
            } else {
                this.router.navigate(['/customer/dashboard']);
            }

            return true;
        }

        return false;
    }

    logout(): void {
        this.authState$.next({
            user: null,
            isAuthenticated: false
        });
        this.storage.removeItem(this.AUTH_KEY);
        this.router.navigate(['/login']);
    }

    private loadAuthState(): void {
        const savedState = this.storage.getItem<AuthState>(this.AUTH_KEY);
        if (savedState && savedState.user) {
            // Convert date strings to Date objects
            savedState.user.createdAt = new Date(savedState.user.createdAt);
            this.authState$.next(savedState);
        }
    }

    private generateMockToken(): string {
        return 'mock_token_' + Math.random().toString(36).substring(7);
    }

    // Helper method to check if user has specific role
    hasRole(role: UserRole): boolean {
        return this.authState$.value.user?.role === role;
    }

    // Method to register new customer (for future use)
    register(userData: Partial<User>): boolean {
        // In real app, this would make HTTP request to backend
        const newUser: User = {
            id: 'customer_' + Date.now(),
            username: userData.username || '',
            email: userData.email || '',
            role: UserRole.CUSTOMER,
            fullName: userData.fullName || '',
            phone: userData.phone,
            createdAt: new Date()
        };

        this.mockUsers.push(newUser);
        return true;
    }
}
