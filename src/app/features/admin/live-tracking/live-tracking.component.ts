import { Component, OnInit, AfterViewInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import * as L from 'leaflet';

interface VehicleLocation {
    id: number;
    model: string;
    licensePlate: string;
    customerName: string;
    lat: number;
    lng: number;
    dailyKm: number;
    status: 'Moving' | 'Parked' | 'Idle';
    lastUpdated: Date;
}

@Component({
    selector: 'app-live-tracking',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './live-tracking.component.html',
    styleUrls: ['./live-tracking.component.css']
})
export class LiveTrackingComponent implements OnInit, AfterViewInit, OnDestroy {
    private map!: L.Map;
    private markers: L.Marker[] = [];

    vehicles: VehicleLocation[] = [];
    notifications: string[] = [];
    selectedVehicle: VehicleLocation | null = null;
    kmLimit = 200; // Daily limit in km

    constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

    // Mock data generator
    private generateMockData() {
        this.vehicles = [
            {
                id: 1,
                model: 'Tesla Model 3',
                licensePlate: 'ABC-1234',
                customerName: 'John Doe',
                lat: 40.7128,
                lng: -74.0060,
                dailyKm: 150,
                status: 'Moving',
                lastUpdated: new Date()
            },
            {
                id: 2,
                model: 'BMW X5',
                licensePlate: 'XYZ-9876',
                customerName: 'Jane Smith',
                lat: 40.7300,
                lng: -73.9950,
                dailyKm: 250, // Exceeds limit
                status: 'Moving',
                lastUpdated: new Date()
            },
            {
                id: 3,
                model: 'Ford Mustang',
                licensePlate: 'LMN-4567',
                customerName: 'Mike Johnson',
                lat: 40.7580,
                lng: -73.9855,
                dailyKm: 45,
                status: 'Parked',
                lastUpdated: new Date()
            },
            {
                id: 4,
                model: 'Chevrolet Tahoe',
                licensePlate: 'RST-3210',
                customerName: 'Emily Davis',
                lat: 40.7829,
                lng: -73.9654,
                dailyKm: 210, // Exceeds limit
                status: 'Idle',
                lastUpdated: new Date()
            }
        ];
    }

    ngOnInit() {
        this.generateMockData();
        this.checkLimits();
    }

    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.initMap();
            this.addMarkers();
        }
    }

    ngOnDestroy() {
        if (this.map) {
            this.map.remove();
        }
    }

    private initMap() {
        // Initialize map centered on NYC
        this.map = L.map('map').setView([40.730610, -73.935242], 11);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);

        // Fix for default marker icon issues in Webpack/Angular
        const iconRetinaUrl = 'assets/marker-icon-2x.png';
        const iconUrl = 'assets/marker-icon.png';
        const shadowUrl = 'assets/marker-shadow.png';

        // We can use a default icon configuration if assets are missing, 
        // but for now we'll assume we might need custom icons or CDN links if local assets aren't set up.
        // Using CDN for reliability in this demo:
        const DefaultIcon = L.icon({
            iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
            iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        L.Marker.prototype.options.icon = DefaultIcon;
    }

    private addMarkers() {
        this.vehicles.forEach(vehicle => {
            const marker = L.marker([vehicle.lat, vehicle.lng])
                .addTo(this.map)
                .bindPopup(`
          <b>${vehicle.model}</b><br>
          Customer: ${vehicle.customerName}<br>
          Status: ${vehicle.status}<br>
          Daily: ${vehicle.dailyKm} km
        `)
                .on('click', () => {
                    this.selectVehicle(vehicle);
                });

            this.markers.push(marker);
        });
    }

    selectVehicle(vehicle: VehicleLocation) {
        this.selectedVehicle = vehicle;
        this.map.setView([vehicle.lat, vehicle.lng], 14);
    }

    private checkLimits() {
        this.vehicles.forEach(v => {
            if (v.dailyKm > this.kmLimit) {
                this.notifications.push(
                    `ALERT: ${v.model} (${v.licensePlate}) has exceeded the daily limit! (${v.dailyKm}km / ${this.kmLimit}km)`
                );
            }
        });
    }

    dismissNotification(index: number) {
        this.notifications.splice(index, 1);
    }
}
