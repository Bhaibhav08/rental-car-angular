import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * SSR-safe wrapper for browser storage APIs
 * Ensures no errors occur when rendering on server
 */
@Injectable({
    providedIn: 'root'
})
export class StorageService {
    private readonly platformId = inject(PLATFORM_ID);
    private readonly isBrowser: boolean;

    constructor() {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    setItem(key: string, value: any): void {
        if (this.isBrowser) {
            try {
                const serializedValue = JSON.stringify(value);
                localStorage.setItem(key, serializedValue);
            } catch (error) {
                console.error('Error saving to localStorage:', error);
            }
        }
    }

    getItem<T>(key: string): T | null {
        if (this.isBrowser) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : null;
            } catch (error) {
                console.error('Error reading from localStorage:', error);
                return null;
            }
        }
        return null;
    }

    removeItem(key: string): void {
        if (this.isBrowser) {
            try {
                localStorage.removeItem(key);
            } catch (error) {
                console.error('Error removing from localStorage:', error);
            }
        }
    }

    clear(): void {
        if (this.isBrowser) {
            try {
                localStorage.clear();
            } catch (error) {
                console.error('Error clearing localStorage:', error);
            }
        }
    }

    // Session storage methods
    setSessionItem(key: string, value: any): void {
        if (this.isBrowser) {
            try {
                const serializedValue = JSON.stringify(value);
                sessionStorage.setItem(key, serializedValue);
            } catch (error) {
                console.error('Error saving to sessionStorage:', error);
            }
        }
    }

    getSessionItem<T>(key: string): T | null {
        if (this.isBrowser) {
            try {
                const item = sessionStorage.getItem(key);
                return item ? JSON.parse(item) : null;
            } catch (error) {
                console.error('Error reading from sessionStorage:', error);
                return null;
            }
        }
        return null;
    }

    removeSessionItem(key: string): void {
        if (this.isBrowser) {
            try {
                sessionStorage.removeItem(key);
            } catch (error) {
                console.error('Error removing from sessionStorage:', error);
            }
        }
    }
}
