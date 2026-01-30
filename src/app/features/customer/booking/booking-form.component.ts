import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../../../core/services/vehicle.service';
import { BookingService } from '../../../core/services/booking.service';
import { Vehicle } from '../../../core/models/vehicle.model';
import { BookingDocument } from '../../../core/models/booking.model';

@Component({
    selector: 'app-booking-form',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './booking-form.component.html',
    styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private vehicleService = inject(VehicleService);
    private bookingService = inject(BookingService);

    vehicle: Vehicle | undefined;
    startDate: string = '';
    endDate: string = '';
    idProof: BookingDocument | undefined;
    drivingLicense: BookingDocument | undefined;
    totalDays: number = 0;
    totalAmount: number = 0;
    errorMessage: string = '';

    ngOnInit() {
        const vehicleId = this.route.snapshot.paramMap.get('vehicleId');
        if (vehicleId) {
            this.vehicleService.getVehicleById(vehicleId).subscribe(v => {
                this.vehicle = v;
            });
        }

        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        this.startDate = today;
    }

    onDateChange() {
        if (this.startDate && this.endDate && this.vehicle) {
            const start = new Date(this.startDate);
            const end = new Date(this.endDate);
            const diffTime = Math.abs(end.getTime() - start.getTime());
            this.totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
            this.totalAmount = this.totalDays * this.vehicle.pricePerDay;
        }
    }

    onFileSelect(event: Event, type: 'id' | 'license') {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files[0]) {
            const file = input.files[0];
            const reader = new FileReader();

            reader.onload = () => {
                const doc: BookingDocument = {
                    name: file.name,
                    type: file.type,
                    data: reader.result as string,
                    uploadedAt: new Date()
                };

                if (type === 'id') {
                    this.idProof = doc;
                } else {
                    this.drivingLicense = doc;
                }
            };

            reader.readAsDataURL(file);
        }
    }

    submitBooking() {
        if (!this.vehicle || !this.startDate || !this.endDate) {
            this.errorMessage = 'Please fill all required fields';
            return;
        }

        if (!this.idProof || !this.drivingLicense) {
            this.errorMessage = 'Please upload both ID proof and driving license';
            return;
        }

        const booking = this.bookingService.createBooking({
            vehicleId: this.vehicle.id,
            startDate: new Date(this.startDate),
            endDate: new Date(this.endDate),
            idProof: this.idProof,
            drivingLicense: this.drivingLicense
        });

        if (booking) {
            alert('Booking created successfully!');
            this.router.navigate(['/customer/bookings']);
        } else {
            this.errorMessage = 'Failed to create booking. Please try again.';
        }
    }
}
