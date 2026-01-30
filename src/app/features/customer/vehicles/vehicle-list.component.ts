import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VehicleService } from '../../../core/services/vehicle.service';
import { Vehicle, VehicleType } from '../../../core/models/vehicle.model';
import { VehicleCardComponent } from '../../../shared/components/vehicle-card/vehicle-card.component';

@Component({
    selector: 'app-vehicle-list',
    standalone: true,
    imports: [CommonModule, FormsModule, VehicleCardComponent],
    templateUrl: './vehicle-list.component.html',
    styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
    private vehicleService = inject(VehicleService);

    vehicles: Vehicle[] = [];
    filteredVehicles: Vehicle[] = [];
    selectedType: string = 'all';
    searchQuery: string = '';

    VehicleType = VehicleType;
    vehicleTypes = ['all', ...Object.values(VehicleType)];

    ngOnInit() {
        this.vehicleService.getVehicles().subscribe(vehicles => {
            this.vehicles = vehicles;
            this.filterVehicles();
        });
    }

    filterVehicles() {
        let filtered = this.vehicles;

        if (this.selectedType !== 'all') {
            filtered = filtered.filter(v => v.type === this.selectedType);
        }

        if (this.searchQuery) {
            const query = this.searchQuery.toLowerCase();
            filtered = filtered.filter(v =>
                v.name.toLowerCase().includes(query) ||
                v.brand.toLowerCase().includes(query) ||
                v.type.toLowerCase().includes(query)
            );
        }

        this.filteredVehicles = filtered;
    }

    onTypeChange() {
        this.filterVehicles();
    }

    onSearchChange() {
        this.filterVehicles();
    }
}
