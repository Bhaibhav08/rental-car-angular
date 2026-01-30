import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customers.html',
  styleUrls: ['./customers.css']
})
export class CustomersComponent {

  customers = [
    {
      name: 'Rahul Sharma',
      email: 'rahul@gmail.com',
      phone: '9876543210',
      totalBookings: 3
    },
    {
      name: 'Anjali Verma',
      email: 'anjali@gmail.com',
      phone: '9123456780',
      totalBookings: 1
    },
    {
      name: 'Amit Singh',
      email: 'amit@gmail.com',
      phone: '9988776655',
      totalBookings: 2
    }
  ];

}
