import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent {
  stats = [
    { label: 'Total Vehicles', value: 18 },
    { label: 'Active Bookings', value: 6 },
    { label: 'Customers', value: 24 },
    { label: 'Available Cars', value: 12 }
  ];
}
