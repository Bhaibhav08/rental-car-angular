import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Vehicle } from '../../../core/models/vehicle.model';
import { VehicleService } from '../../../core/services/vehicle.service';

@Component({
    selector: 'app-vehicle-detail',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="vehicle-detail" *ngIf="vehicle">
      <div class="detail-container">
        <div class="detail-image">
          <img [src]="vehicle.imageUrl" [alt]="vehicle.name" />
        </div>
        <div class="detail-content">
          <h1>{{ vehicle.brand }} {{ vehicle.name }}</h1>
          <div class="price">₹{{ vehicle.pricePerDay }}/day</div>
          <div class="specs-grid">
            <div class="spec"><strong>Type:</strong> {{ vehicle.type }}</div>
            <div class="spec"><strong>Transmission:</strong> {{ vehicle.transmission }}</div>
            <div class="spec"><strong>Fuel:</strong> {{ vehicle.fuelType }}</div>
            <div class="spec"><strong>Seats:</strong> {{ vehicle.seats }}</div>
            <div class="spec"><strong>Year:</strong> {{ vehicle.year }}</div>
            <div class="spec"><strong>KM/Day:</strong> {{ vehicle.kmPerDay }}</div>
          </div>
          <p class="description">{{ vehicle.description }}</p>
          <div class="features">
            <h3>Features</h3>
            <ul>
              <li *ngFor="let feature of vehicle.features">{{ feature }}</li>
            </ul>
          </div>
          <div class="actions">
            <a [routerLink]="['/customer/book', vehicle.id]" class="btn btn-book" *ngIf="vehicle.status === 'Available'">Book Now</a>
            <span class="status-unavailable" *ngIf="vehicle.status !== 'Available'">Currently {{ vehicle.status }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .vehicle-detail { padding: 40px 24px; background: white; }
    .detail-container { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 48px; }
    .detail-image img { width: 100%; border-radius: 16px; }
    .detail-content h1 { font-size: 36px; margin: 0 0 16px 0; }
    .price { font-size: 32px; font-weight: 700; color: #667eea; margin-bottom: 24px; }
    .specs-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 24px; }
    .spec { padding: 12px; background: #f9fafb; border-radius: 8px; }
    .description { color: #6b7280; line-height: 1.6; margin-bottom: 24px; }
    .features h3 { font-size: 20px; margin-bottom: 12px; }
    .features ul { list-style: none; padding: 0; display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
    .features li::before { content: '✓ '; color: #10b981; font-weight: 700; }
    .actions { margin-top: 32px; }
    .btn-book { display: inline-block; padding: 16px 48px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; font-weight: 600; text-decoration: none; }
    .status-unavailable { color: #ef4444; font-weight: 600; }
    @media (max-width: 968px) { .detail-container { grid-template-columns: 1fr; } }
  `]
})
export class VehicleDetailComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private vehicleService = inject(VehicleService);

    vehicle: Vehicle | undefined;

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.vehicleService.getVehicleById(id).subscribe(v => this.vehicle = v);
        }
    }
}
