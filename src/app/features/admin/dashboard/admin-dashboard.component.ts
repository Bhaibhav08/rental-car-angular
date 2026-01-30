import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleService } from '../../../core/services/vehicle.service';
import { BookingService } from '../../../core/services/booking.service';
import { CustomerService } from '../../../core/services/customer.service';

@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
    private vehicleService = inject(VehicleService);
    private bookingService = inject(BookingService);
    private customerService = inject(CustomerService);

    stats = {
        totalVehicles: 0,
        availableVehicles: 0,
        totalBookings: 0,
        activeBookings: 0,
        totalCustomers: 0,
        totalRevenue: 0
    };

    ngOnInit() {
        this.vehicleService.getVehicles().subscribe(vehicles => {
            this.stats.totalVehicles = vehicles.length;
            this.stats.availableVehicles = vehicles.filter(v => v.status === 'Available').length;
        });

        this.bookingService.getBookings().subscribe(bookings => {
            this.stats.totalBookings = bookings.length;
            this.stats.activeBookings = bookings.filter(b => b.status === 'Active' || b.status === 'Confirmed').length;
            this.stats.totalRevenue = bookings
                .filter(b => b.status !== 'Cancelled')
                .reduce((sum, b) => sum + b.totalAmount, 0);
        });

        this.customerService.getCustomers().subscribe(customers => {
            this.stats.totalCustomers = customers.length;
        });
    }
}
