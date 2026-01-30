import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Customer } from '../models/customer.model';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    private readonly storage = inject(StorageService);
    private readonly CUSTOMERS_KEY = 'rental_car_customers';

    private customers$ = new BehaviorSubject<Customer[]>([]);

    constructor() {
        this.loadCustomers();
    }

    getCustomers(): Observable<Customer[]> {
        return this.customers$.asObservable();
    }

    getCustomerById(id: string): Observable<Customer | undefined> {
        return this.customers$.pipe(
            map(customers => customers.find(c => c.id === id))
        );
    }

    addCustomer(customer: Omit<Customer, 'id' | 'createdAt'>): void {
        const newCustomer: Customer = {
            ...customer,
            id: 'customer_' + Date.now(),
            createdAt: new Date()
        };

        const currentCustomers = this.customers$.value;
        const updatedCustomers = [...currentCustomers, newCustomer];
        this.customers$.next(updatedCustomers);
        this.saveCustomers(updatedCustomers);
    }

    updateCustomer(id: string, updates: Partial<Customer>): void {
        const currentCustomers = this.customers$.value;
        const updatedCustomers = currentCustomers.map(customer =>
            customer.id === id ? { ...customer, ...updates } : customer
        );
        this.customers$.next(updatedCustomers);
        this.saveCustomers(updatedCustomers);
    }

    incrementBookingCount(id: string): void {
        const currentCustomers = this.customers$.value;
        const updatedCustomers = currentCustomers.map(customer =>
            customer.id === id ? { ...customer, totalBookings: customer.totalBookings + 1 } : customer
        );
        this.customers$.next(updatedCustomers);
        this.saveCustomers(updatedCustomers);
    }

    searchCustomers(query: string): Observable<Customer[]> {
        const lowerQuery = query.toLowerCase();
        return this.customers$.pipe(
            map(customers => customers.filter(c =>
                c.fullName.toLowerCase().includes(lowerQuery) ||
                c.email.toLowerCase().includes(lowerQuery) ||
                c.phone.includes(query)
            ))
        );
    }

    private loadCustomers(): void {
        const savedCustomers = this.storage.getItem<Customer[]>(this.CUSTOMERS_KEY);

        if (savedCustomers && savedCustomers.length > 0) {
            // Convert date strings back to Date objects
            const customers = savedCustomers.map(c => ({
                ...c,
                createdAt: new Date(c.createdAt)
            }));
            this.customers$.next(customers);
        } else {
            const mockCustomers = this.generateMockCustomers();
            this.customers$.next(mockCustomers);
            this.saveCustomers(mockCustomers);
        }
    }

    private saveCustomers(customers: Customer[]): void {
        this.storage.setItem(this.CUSTOMERS_KEY, customers);
    }

    private generateMockCustomers(): Customer[] {
        return [
            {
                id: 'customer1',
                fullName: 'John Doe',
                email: 'john.doe@example.com',
                phone: '+91 9876543211',
                address: '123 Main St, Mumbai, Maharashtra',
                licenseNumber: 'MH01-20230001234',
                totalBookings: 5,
                createdAt: new Date('2024-06-15')
            },
            {
                id: 'customer2',
                fullName: 'Jane Smith',
                email: 'jane.smith@example.com',
                phone: '+91 9876543212',
                address: '456 Park Ave, Delhi',
                licenseNumber: 'DL05-20220002345',
                totalBookings: 3,
                createdAt: new Date('2024-08-20')
            },
            {
                id: 'customer3',
                fullName: 'Bob Johnson',
                email: 'bob.johnson@example.com',
                phone: '+91 9876543213',
                address: '789 Lake Rd, Bangalore, Karnataka',
                licenseNumber: 'KA03-20210003456',
                totalBookings: 8,
                createdAt: new Date('2024-02-10')
            },
            {
                id: 'customer4',
                fullName: 'Alice Williams',
                email: 'alice.w@example.com',
                phone: '+91 9876543214',
                address: '321 Beach View, Chennai, Tamil Nadu',
                licenseNumber: 'TN09-20230004567',
                totalBookings: 2,
                createdAt: new Date('2024-10-05')
            },
            {
                id: 'customer5',
                fullName: 'Charlie Brown',
                email: 'charlie.b@example.com',
                phone: '+91 9876543215',
                address: '654 Market Street, Pune, Maharashtra',
                licenseNumber: 'MH12-20220005678',
                totalBookings: 6,
                createdAt: new Date('2024-04-18')
            },
            {
                id: 'customer6',
                fullName: 'Diana Prince',
                email: 'diana.p@example.com',
                phone: '+91 9876543216',
                address: '987 Wonder Lane, Hyderabad, Telangana',
                licenseNumber: 'TS07-20230006789',
                totalBookings: 4,
                createdAt: new Date('2024-07-22')
            },
            {
                id: 'customer7',
                fullName: 'Ethan Hunt',
                email: 'ethan.h@example.com',
                phone: '+91 9876543217',
                address: '159 Mission Rd, Ahmedabad, Gujarat',
                licenseNumber: 'GJ01-20210007890',
                totalBookings: 10,
                createdAt: new Date('2024-01-30')
            },
            {
                id: 'customer8',
                fullName: 'Fiona Gallagher',
                email: 'fiona.g@example.com',
                phone: '+91 9876543218',
                address: '753 South Side, Kolkata, West Bengal',
                licenseNumber: 'WB02-20220008901',
                totalBookings: 1,
                createdAt: new Date('2024-11-12')
            }
        ];
    }
}
