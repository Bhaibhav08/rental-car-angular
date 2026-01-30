import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookings.html',
  styleUrls: ['./bookings.css']
})
export class BookingsComponent {

  bookings = [
    {
      customer: 'Rahul Sharma',
      vehicle: 'Hyundai i20',
      fromDate: '2026-01-20',
      toDate: '2026-01-23',
      status: 'Active'
    },
    {
      customer: 'Anjali Verma',
      vehicle: 'Honda City',
      fromDate: '2026-01-18',
      toDate: '2026-01-19',
      status: 'Completed'
    },
    {
      customer: 'Amit Singh',
      vehicle: 'Creta',
      fromDate: '2026-01-22',
      toDate: '2026-01-25',
      status: 'Cancelled'
    }
  ];

}
