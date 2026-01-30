import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BookingService } from '../../../core/services/booking.service';
import { Booking, BookingStatus } from '../../../core/models/booking.model';

@Component({
  selector: 'app-booking-history',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-7xl mx-auto px-4">
        <!-- Header -->
        <div class="mb-6">
          <h1 class="text-2xl font-bold text-gray-900">My Bookings</h1>
          <p class="text-sm text-gray-600">Track your rental history and manage cancellations</p>
        </div>

        <!-- Bookings List -->
        <div *ngIf="bookings.length > 0" class="space-y-4">
          <div *ngFor="let booking of bookings" 
               class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            
            <!-- Header -->
            <div class="flex items-start justify-between mb-3">
              <div>
                <h3 class="text-lg font-bold text-gray-900">{{ booking.vehicleName }}</h3>
                <p class="text-xs text-gray-500">ID: {{ booking.id }}</p>
              </div>
              <span [ngClass]="getStatusClass(booking.status)">
                {{ booking.status }}
              </span>
            </div>

            <!-- Compact Details Grid -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
              <div>
                <p class="text-xs text-gray-500">Start</p>
                <p class="font-medium">{{ booking.startDate | date:'short' }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500">End</p>
                <p class="font-medium">{{ booking.endDate | date:'short' }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500">Days</p>
                <p class="font-medium">{{ booking.totalDays }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500">Amount</p>
                <p class="font-bold" style="color: #1f2937;">₹{{ booking.totalAmount | number }}</p>
              </div>
            </div>

            <!-- Status Message -->
            <div *ngIf="booking.status === 'Pending'" class="text-xs p-2 bg-yellow-50 border border-yellow-200 rounded text-yellow-800 mb-3">
              ⏳ Waiting for admin confirmation
            </div>
            <div *ngIf="booking.status === 'Confirmed'" class="text-xs p-2 bg-blue-50 border border-blue-200 rounded text-blue-800 mb-3">
              ✅ Booking confirmed! Vehicle ready on start date
            </div>
            <div *ngIf="booking.status === 'Active'" class="text-xs p-2 bg-green-50 border border-green-200 rounded text-green-800 mb-3">
              🚗 Rental is active. Enjoy your ride!
            </div>
            <div *ngIf="booking.status === 'Completed'" class="text-xs p-2 bg-gray-50 border border-gray-200 rounded text-gray-800 mb-3">
              ✓ Rental completed
            </div>
            <div *ngIf="booking.status === 'Cancelled'" class="text-xs p-2 bg-red-50 border border-red-200 rounded text-red-800 mb-3">
              ❌ Booking cancelled - 50% refund processed
            </div>

            <!-- Cancel Button -->
            <div *ngIf="canCancelBooking(booking)" class="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded">
              <div class="flex-1">
                <p class="text-sm font-semibold text-gray-900">Cancellation Policy</p>
                <p class="text-xs text-gray-600">Cancel before start date and get 50% refund (₹{{ getRefundAmount(booking) | number }})</p>
              </div>
              <button 
                (click)="cancelBooking(booking)"
                class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition">
                Cancel Booking
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div *ngIf="bookings.length === 0" class="text-center py-12 bg-white rounded-lg border border-gray-200">
          <div class="text-4xl mb-4">📋</div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">No bookings yet</h3>
          <p class="text-sm text-gray-600 mb-4">Browse vehicles to make your first booking</p>
          <a routerLink="/customer/vehicles" class="inline-block px-6 py-2 text-white font-semibold rounded-lg transition"
             style="background: linear-gradient(135deg, #1f2937 0%, #111827 100%);">
            Browse Vehicles
          </a>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class BookingHistoryComponent implements OnInit {
  private bookingService = inject(BookingService);
  bookings: Booking[] = [];

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    this.bookingService.getCurrentUserBookings().subscribe(bookings => {
      this.bookings = bookings.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    });
  }

  canCancelBooking(booking: Booking): boolean {
    // Can cancel if status is Pending or Confirmed AND start date is in the future
    const now = new Date();
    const startDate = new Date(booking.startDate);

    return (booking.status === 'Pending' || booking.status === 'Confirmed') &&
      startDate > now;
  }

  getRefundAmount(booking: Booking): number {
    return booking.totalAmount * 0.5; // 50% refund
  }

  cancelBooking(booking: Booking) {
    const refundAmount = this.getRefundAmount(booking);
    const confirmMessage = `Are you sure you want to cancel this booking?\n\n` +
      `Vehicle: ${booking.vehicleName}\n` +
      `Start Date: ${new Date(booking.startDate).toLocaleDateString()}\n` +
      `Total Amount: ₹${booking.totalAmount}\n` +
      `Refund Amount (50%): ₹${refundAmount}\n\n` +
      `The refund will be processed within 5-7 business days.`;

    if (confirm(confirmMessage)) {
      if (this.bookingService.updateBookingStatus(booking.id, BookingStatus.CANCELLED)) {
        this.loadBookings();
        alert(`Booking cancelled successfully!\n\nRefund of ₹${refundAmount} will be processed within 5-7 business days.`);
      } else {
        alert('Failed to cancel booking. Please try again or contact support.');
      }
    }
  }

  getStatusClass(status: string): string {
    const classes: Record<string, string> = {
      'Pending': 'badge-warning',
      'Confirmed': 'badge-info',
      'Active': 'badge-success',
      'Completed': 'badge bg-gray-100 text-gray-800',
      'Cancelled': 'badge-danger'
    };
    return classes[status] || 'badge';
  }
}
