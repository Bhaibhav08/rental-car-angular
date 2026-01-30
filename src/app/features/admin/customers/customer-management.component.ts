import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../../core/services/customer.service';
import { Customer } from '../../../core/models/customer.model';

@Component({
    selector: 'app-customer-management',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="admin-page">
      <div class="container">
        <div class="page-header">
          <h1>Customer Management</h1>
          <p>Manage {{ customers.length }} registered customers</p>
        </div>
        <div class="data-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Bookings</th>
                <th>Member Since</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let customer of customers">
                <td><strong>{{ customer.fullName }}</strong></td>
                <td>{{ customer.email }}</td>
                <td>{{ customer.phone }}</td>
                <td>{{ customer.totalBookings }}</td>
                <td>{{ customer.createdAt | date }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .admin-page { padding: 40px 24px; min-height: calc(100vh - 70px); }
    .container { max-width: 1400px; margin: 0 auto; }
    .page-header { margin-bottom: 32px; }
    .page-header h1 { font-size: 32px; font-weight: 700; color: white; margin: 0 0 8px 0; }
    .page-header p { color: #9ca3af; margin: 0; }
    .data-table { background: #1f2937; border-radius: 16px; padding: 24px; border: 1px solid #374151; overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; }
    th { text-align: left; padding: 12px; color: #9ca3af; font-weight: 600; font-size: 13px; text-transform: uppercase; border-bottom: 2px solid #374151; }
    td { padding: 16px 12px; color: white; border-bottom: 1px solid #374151; }
    tr:last-child td { border-bottom: none; }
    tbody tr:hover { background: rgba(55, 65, 81, 0.5); }
  `]
})
export class CustomerManagementComponent implements OnInit {
    private customerService = inject(CustomerService);
    customers: Customer[] = [];

    ngOnInit() {
        this.customerService.getCustomers().subscribe(c => this.customers = c);
    }
}
