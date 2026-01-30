import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-book-vehicle',
  imports: [CommonModule, FormsModule],
  templateUrl: './book-vehicle.html'
})
export class BookVehicleComponent {

  vehicle = JSON.parse(localStorage.getItem('selectedVehicle') || '{}');

  booking = {
    fromDate: '',
    toDate: '',
    idProof: null,
    license: null
  };

  constructor(private router: Router) {}

  submitBooking() {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');

    bookings.push({
      vehicle: this.vehicle.name,
      from: this.booking.fromDate,
      to: this.booking.toDate,
      user: localStorage.getItem('userEmail'),
      status: 'Booked'
    });

    localStorage.setItem('bookings', JSON.stringify(bookings));
    alert('Vehicle booked successfully!');
    this.router.navigate(['/vehicles']);
  }
}
