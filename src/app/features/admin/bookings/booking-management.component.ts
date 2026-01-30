import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../../core/services/booking.service';
import { Booking, BookingStatus } from '../../../core/models/booking.model';

@Component({
  selector: 'app-booking-management',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="min-height: 100vh; background-color: #1a202c; padding: 1.5rem;">
      <div style="max-width: 1280px; margin: 0 auto;">
        <!-- Header -->
        <div style="margin-bottom: 1.5rem;">
          <h1 style="font-size: 1.5rem; font-weight: bold; color: white; margin-bottom: 0.25rem;">Booking Management</h1>
          <p style="font-size: 0.875rem; color: #a0aec0;">Manage {{ bookings.length }} bookings</p>
        </div>

        <!-- Stats -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 0.75rem; margin-bottom: 1.5rem;">
          <div style="background-color: #2d3748; padding: 0.75rem; border-radius: 0.5rem; border: 1px solid #4a5568;">
            <div style="font-size: 1.25rem; font-weight: bold; color: #ecc94b;">{{ getPendingCount() }}</div>
            <div style="font-size: 0.75rem; color: #a0aec0;">Pending</div>
          </div>
          <div style="background-color: #2d3748; padding: 0.75rem; border-radius: 0.5rem; border: 1px solid #4a5568;">
            <div style="font-size: 1.25rem; font-weight: bold; color: #4299e1;">{{ getConfirmedCount() }}</div>
            <div style="font-size: 0.75rem; color: #a0aec0;">Confirmed</div>
          </div>
          <div style="background-color: #2d3748; padding: 0.75rem; border-radius: 0.5rem; border: 1px solid #4a5568;">
            <div style="font-size: 1.25rem; font-weight: bold; color: #48bb78;">{{ getActiveCount() }}</div>
            <div style="font-size: 0.75rem; color: #a0aec0;">Active</div>
          </div>
          <div style="background-color: #2d3748; padding: 0.75rem; border-radius: 0.5rem; border: 1px solid #4a5568;">
            <div style="font-size: 1.25rem; font-weight: bold; color: #a0aec0;">{{ getCompletedCount() }}</div>
            <div style="font-size: 0.75rem; color: #a0aec0;">Completed</div>
          </div>
        </div>

        <!-- Table -->
        <div style="background-color: #2d3748; border-radius: 0.5rem; overflow: hidden; border: 1px solid #4a5568;">
          <div style="overflow-x: auto;">
            <table style="width: 100%; font-size: 0.875rem;">
              <thead style="background-color: #1a202c;">
                <tr>
                  <th style="padding: 0.75rem 1rem; text-align: left; font-size: 0.75rem; font-weight: 600; color: #a0aec0;">ID</th>
                  <th style="padding: 0.75rem 1rem; text-align: left; font-size: 0.75rem; font-weight: 600; color: #a0aec0;">Customer</th>
                  <th style="padding: 0.75rem 1rem; text-align: left; font-size: 0.75rem; font-weight: 600; color: #a0aec0;">Vehicle</th>
                  <th style="padding: 0.75rem 1rem; text-align: left; font-size: 0.75rem; font-weight: 600; color: #a0aec0;">Dates</th>
                  <th style="padding: 0.75rem 1rem; text-align: left; font-size: 0.75rem; font-weight: 600; color: #a0aec0;">Amount</th>
                  <th style="padding: 0.75rem 1rem; text-align: left; font-size: 0.75rem; font-weight: 600; color: #a0aec0;">Status</th>
                  <th style="padding: 0.75rem 1rem; text-align: left; font-size: 0.75rem; font-weight: 600; color: #a0aec0;">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let booking of bookings" style="border-top: 1px solid #4a5568;">
                  <td style="padding: 0.75rem 1rem;">
                    <code style="font-size: 0.75rem; color: #90cdf4;">{{ booking.id.slice(0, 12) }}...</code>
                  </td>
                  <td style="padding: 0.75rem 1rem;">
                    <div style="color: white; font-size: 0.875rem;">{{ booking.customerName }}</div>
                    <div style="font-size: 0.75rem; color: #a0aec0;">{{ booking.customerEmail }}</div>
                  </td>
                  <td style="padding: 0.75rem 1rem; color: white; font-size: 0.875rem;">{{ booking.vehicleName }}</td>
                  <td style="padding: 0.75rem 1rem;">
                    <div style="font-size: 0.75rem; color: #cbd5e0;">{{ booking.startDate | date:'short' }}</div>
                    <div style="font-size: 0.75rem; color: #718096;">{{ booking.totalDays }} days</div>
                  </td>
                  <td style="padding: 0.75rem 1rem; color: white; font-weight: bold;">₹{{ booking.totalAmount | number }}</td>
                  <td style="padding: 0.75rem 1rem;">
                    <span [ngClass]="getStatusClass(booking.status)">{{ booking.status }}</span>
                  </td>
                  <td style="padding: 0.75rem 1rem;">
                    <div style="display: flex; gap: 0.25rem;">
                      <button 
                        *ngIf="booking.status === 'Pending'"
                        (click)="confirmBooking(booking.id)"
                        style="padding: 0.25rem 0.75rem; background-color: #48bb78; color: white; font-size: 0.75rem; font-weight: 500; border-radius: 0.25rem; border: none; cursor: pointer;"
                        onmouseover="this.style.backgroundColor='#38a169'" 
                        onmouseout="this.style.backgroundColor='#48bb78'">
                        Confirm
                      </button>
                      <button 
                        *ngIf="booking.status === 'Confirmed'"
                        (click)="activateBooking(booking.id)"
                        style="padding: 0.25rem 0.75rem; background-color: #4299e1; color: white; font-size: 0.75rem; font-weight: 500; border-radius: 0.25rem; border: none; cursor: pointer;"
                        onmouseover="this.style.backgroundColor='#3182ce'" 
                        onmouseout="this.style.backgroundColor='#4299e1'">
                        Activate
                      </button>
                      <button 
                        *ngIf="booking.status === 'Active'"
                        (click)="completeBooking(booking.id)"
                        style="padding: 0.25rem 0.75rem; background-color: #718096; color: white; font-size: 0.75rem; font-weight: 500; border-radius: 0.25rem; border: none; cursor: pointer;"
                        onmouseover="this.style.backgroundColor='#4a5568'" 
                        onmouseout="this.style.backgroundColor='#718096'">
                        Complete
                      </button>
                      <button 
                        *ngIf="booking.status === 'Pending' || booking.status === 'Confirmed'"
                        (click)="cancelBooking(booking.id)"
                        style="padding: 0.25rem 0.75rem; background-color: #f56565; color: white; font-size: 0.75rem; font-weight: 500; border-radius: 0.25rem; border: none; cursor: pointer;"
                        onmouseover="this.style.backgroundColor='#e53e3e'" 
                        onmouseout="this.style.backgroundColor='#f56565'">
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class BookingManagementComponent implements OnInit {
  private bookingService = inject(BookingService);
  bookings: Booking[] = [];

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    this.bookingService.getBookings().subscribe(b => {
      this.bookings = b.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    });
  }

  confirmBooking(bookingId: string) {
    if (this.bookingService.updateBookingStatus(bookingId, BookingStatus.CONFIRMED)) {
      this.loadBookings();
      alert('Booking confirmed!');
    }
  }

  activateBooking(bookingId: string) {
    if (this.bookingService.updateBookingStatus(bookingId, BookingStatus.ACTIVE)) {
      this.loadBookings();
      alert('Booking activated!');
    }
  }

  completeBooking(bookingId: string) {
    if (this.bookingService.updateBookingStatus(bookingId, BookingStatus.COMPLETED)) {
      this.loadBookings();
      alert('Booking completed!');
    }
  }

  cancelBooking(bookingId: string) {
    if (confirm('Cancel this booking?')) {
      if (this.bookingService.updateBookingStatus(bookingId, BookingStatus.CANCELLED)) {
        this.loadBookings();
        alert('Booking cancelled!');
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

  getPendingCount(): number {
    return this.bookings.filter(b => b.status === 'Pending').length;
  }

  getConfirmedCount(): number {
    return this.bookings.filter(b => b.status === 'Confirmed').length;
  }

  getActiveCount(): number {
    return this.bookings.filter(b => b.status === 'Active').length;
  }

  getCompletedCount(): number {
    return this.bookings.filter(b => b.status === 'Completed').length;
  }
}
