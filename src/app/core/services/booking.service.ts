import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Booking, BookingStatus, CreateBookingRequest } from '../models/booking.model';
import { StorageService } from './storage.service';
import { AuthService } from './auth.service';
import { VehicleService } from './vehicle.service';
import { VehicleStatus } from '../models/vehicle.model';

@Injectable({
    providedIn: 'root'
})
export class BookingService {
    private readonly storage = inject(StorageService);
    private readonly authService = inject(AuthService);
    private readonly vehicleService = inject(VehicleService);

    private readonly BOOKINGS_KEY = 'rental_car_bookings';
    private bookings$ = new BehaviorSubject<Booking[]>([]);

    constructor() {
        this.loadBookings();
    }

    getBookings(): Observable<Booking[]> {
        return this.bookings$.asObservable();
    }

    getCustomerBookings(customerId: string): Observable<Booking[]> {
        return this.bookings$.pipe(
            map(bookings => bookings.filter(b => b.customerId === customerId))
        );
    }

    getCurrentUserBookings(): Observable<Booking[]> {
        const currentUser = this.authService.getCurrentUser();
        if (!currentUser) {
            return new BehaviorSubject<Booking[]>([]).asObservable();
        }
        return this.getCustomerBookings(currentUser.id);
    }

    getBookingById(id: string): Observable<Booking | undefined> {
        return this.bookings$.pipe(
            map(bookings => bookings.find(b => b.id === id))
        );
    }

    getBookingsByStatus(status: BookingStatus): Observable<Booking[]> {
        return this.bookings$.pipe(
            map(bookings => bookings.filter(b => b.status === status))
        );
    }

    createBooking(request: CreateBookingRequest): Booking | null {
        const currentUser = this.authService.getCurrentUser();
        if (!currentUser) {
            return null;
        }

        const totalDays = this.calculateDays(request.startDate, request.endDate);

        // Get vehicle synchronously for price calculation
        let vehicleName = 'Unknown Vehicle';
        let pricePerDay = 0;

        this.vehicleService.getVehicleById(request.vehicleId).subscribe(vehicle => {
            if (vehicle) {
                vehicleName = `${vehicle.brand} ${vehicle.name}`;
                pricePerDay = vehicle.pricePerDay;
            }
        }).unsubscribe();

        const newBooking: Booking = {
            id: 'booking_' + Date.now(),
            vehicleId: request.vehicleId,
            vehicleName,
            customerId: currentUser.id,
            customerName: currentUser.fullName,
            customerEmail: currentUser.email,
            startDate: new Date(request.startDate),
            endDate: new Date(request.endDate),
            totalDays,
            totalAmount: totalDays * pricePerDay,
            status: BookingStatus.PENDING,
            idProof: request.idProof,
            drivingLicense: request.drivingLicense,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const currentBookings = this.bookings$.value;
        const updatedBookings = [...currentBookings, newBooking];
        this.bookings$.next(updatedBookings);
        this.saveBookings(updatedBookings);

        // Update vehicle status
        this.vehicleService.updateVehicleStatus(request.vehicleId, VehicleStatus.BOOKED);

        return newBooking;
    }

    calculateBookingStats(): Observable<{
        total: number;
        pending: number;
        confirmed: number;
        active: number;
        completed: number;
        cancelled: number;
        totalRevenue: number;
    }> {
        return this.bookings$.pipe(
            map(bookings => ({
                total: bookings.length,
                pending: bookings.filter(b => b.status === BookingStatus.PENDING).length,
                confirmed: bookings.filter(b => b.status === BookingStatus.CONFIRMED).length,
                active: bookings.filter(b => b.status === BookingStatus.ACTIVE).length,
                completed: bookings.filter(b => b.status === BookingStatus.COMPLETED).length,
                cancelled: bookings.filter(b => b.status === BookingStatus.CANCELLED).length,
                totalRevenue: bookings
                    .filter(b => b.status !== BookingStatus.CANCELLED)
                    .reduce((sum, b) => sum + b.totalAmount, 0)
            }))
        );
    }

    updateBookingStatus(bookingId: string, status: BookingStatus): boolean {
        const currentBookings = this.bookings$.value;
        const bookingIndex = currentBookings.findIndex(b => b.id === bookingId);

        if (bookingIndex === -1) {
            return false;
        }

        const updatedBookings = [...currentBookings];
        updatedBookings[bookingIndex] = {
            ...updatedBookings[bookingIndex],
            status,
            updatedAt: new Date()
        };

        this.bookings$.next(updatedBookings);
        this.saveBookings(updatedBookings);

        // If booking is confirmed or active, ensure vehicle is marked as booked
        if (status === BookingStatus.CONFIRMED || status === BookingStatus.ACTIVE) {
            const booking = updatedBookings[bookingIndex];
            this.vehicleService.updateVehicleStatus(booking.vehicleId, VehicleStatus.BOOKED);
        }

        // If booking is cancelled or completed, mark vehicle as available
        if (status === BookingStatus.CANCELLED || status === BookingStatus.COMPLETED) {
            const booking = updatedBookings[bookingIndex];
            this.vehicleService.updateVehicleStatus(booking.vehicleId, VehicleStatus.AVAILABLE);
        }

        return true;
    }

    cancelBooking(id: string): void {
        this.updateBookingStatus(id, BookingStatus.CANCELLED);
    }

    private calculateDays(startDate: Date, endDate: Date): number {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays || 1;
    }

    private loadBookings(): void {
        const savedBookings = this.storage.getItem<Booking[]>(this.BOOKINGS_KEY);

        if (savedBookings && savedBookings.length > 0) {
            // Convert date strings back to Date objects
            const bookings = savedBookings.map(b => ({
                ...b,
                startDate: new Date(b.startDate),
                endDate: new Date(b.endDate),
                createdAt: new Date(b.createdAt),
                updatedAt: new Date(b.updatedAt),
                idProof: b.idProof ? { ...b.idProof, uploadedAt: new Date(b.idProof.uploadedAt) } : undefined,
                drivingLicense: b.drivingLicense ? { ...b.drivingLicense, uploadedAt: new Date(b.drivingLicense.uploadedAt) } : undefined
            }));
            this.bookings$.next(bookings);
        } else {
            // Initialize with some mock bookings
            const mockBookings = this.generateMockBookings();
            this.bookings$.next(mockBookings);
            this.saveBookings(mockBookings);
        }
    }

    private saveBookings(bookings: Booking[]): void {
        this.storage.setItem(this.BOOKINGS_KEY, bookings);
    }

    private generateMockBookings(): Booking[] {
        const now = new Date();
        const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

        return [
            {
                id: 'booking_1',
                vehicleId: 'v5',
                vehicleName: 'Maruti Suzuki Ciaz',
                customerId: 'customer1',
                customerName: 'Arjun Sharma',
                customerEmail: 'john@example.com',
                startDate: tomorrow,
                endDate: new Date(tomorrow.getTime() + 3 * 24 * 60 * 60 * 1000),
                totalDays: 3,
                totalAmount: 4800,
                status: BookingStatus.CONFIRMED,
                createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
                updatedAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000)
            },
            {
                id: 'booking_2',
                vehicleId: 'v14',
                vehicleName: 'Tata Altroz',
                customerId: 'customer2',
                customerName: 'Jane Smith',
                customerEmail: 'jane@example.com',
                startDate: nextWeek,
                endDate: new Date(nextWeek.getTime() + 5 * 24 * 60 * 60 * 1000),
                totalDays: 5,
                totalAmount: 7000,
                status: BookingStatus.PENDING,
                createdAt: now,
                updatedAt: now
            },
            {
                id: 'booking_3',
                vehicleId: 'v25',
                vehicleName: 'BMW i4',
                customerId: 'customer3',
                customerName: 'Bob Johnson',
                customerEmail: 'bob@example.com',
                startDate: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
                endDate: now,
                totalDays: 5,
                totalAmount: 47500,
                status: BookingStatus.COMPLETED,
                createdAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
                updatedAt: now
            }
        ];
    }
}
