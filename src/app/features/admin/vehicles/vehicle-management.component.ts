import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleService } from '../../../core/services/vehicle.service';
import { Vehicle } from '../../../core/models/vehicle.model';

@Component({
    selector: 'app-vehicle-management',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="admin-page">
      <div class="container">
        <div class="page-header">
          <h1>Vehicle Management</h1>
          <p>Manage your fleet of {{ vehicles.length }} vehicles</p>
        </div>
        <div class="data-table">
          <table>
            <thead>
              <tr>
                <th>Vehicle</th>
                <th>Type</th>
                <th>Price/Day</th>
                <th>Status</th>
                <th>KM/Day</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let vehicle of vehicles">
                <td><strong>{{ vehicle.brand }} {{ vehicle.name }}</strong></td>
                <td>{{ vehicle.type }}</td>
                <td>₹{{ vehicle.pricePerDay }}</td>
                <td><span class="badge" [class]="vehicle.status.toLowerCase()">{{ vehicle.status }}</span></td>
                <td>{{ vehicle.kmPerDay }} km</td>
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
    .badge { padding: 4px 12px; border-radius: 12px; font-size: 11px; font-weight: 600; text-transform: uppercase; }
    .badge.available { background: rgba(16, 185, 129, 0.2); color: #10b981; }
    .badge.booked { background: rgba(245, 158, 11, 0.2); color: #f59e0b; }
    .badge.maintenance { background: rgba(239, 68, 68, 0.2); color: #ef4444; }
  `]
})
export class VehicleManagementComponent implements OnInit {
    private vehicleService = inject(VehicleService);
    vehicles: Vehicle[] = [];

    ngOnInit() {
        this.vehicleService.getVehicles().subscribe(v => this.vehicles = v);
    }
}
