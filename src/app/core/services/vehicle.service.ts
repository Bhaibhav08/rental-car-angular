import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Vehicle, VehicleType, VehicleStatus } from '../models/vehicle.model';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class VehicleService {
    private readonly storage = inject(StorageService);
    private readonly VEHICLES_KEY = 'rental_car_vehicles';

    private vehicles$ = new BehaviorSubject<Vehicle[]>([]);

    constructor() {
        // Force regenerate vehicles to use new imageUrls (remove this after first load)
        this.storage.removeItem(this.VEHICLES_KEY);
        this.loadVehicles();
    }

    getVehicles(): Observable<Vehicle[]> {
        return this.vehicles$.asObservable();
    }

    getAvailableVehicles(): Observable<Vehicle[]> {
        return this.vehicles$.pipe(
            map(vehicles => vehicles.filter(v => v.status === VehicleStatus.AVAILABLE))
        );
    }

    getVehicleById(id: string): Observable<Vehicle | undefined> {
        return this.vehicles$.pipe(
            map(vehicles => vehicles.find(v => v.id === id))
        );
    }

    getVehiclesByType(type: VehicleType): Observable<Vehicle[]> {
        return this.vehicles$.pipe(
            map(vehicles => vehicles.filter(v => v.type === type))
        );
    }

    addVehicle(vehicle: Omit<Vehicle, 'id'>): void {
        const newVehicle: Vehicle = {
            ...vehicle,
            id: 'vehicle_' + Date.now()
        };

        const currentVehicles = this.vehicles$.value;
        const updatedVehicles = [...currentVehicles, newVehicle];
        this.vehicles$.next(updatedVehicles);
        this.saveVehicles(updatedVehicles);
    }

    updateVehicle(id: string, updates: Partial<Vehicle>): void {
        const currentVehicles = this.vehicles$.value;
        const updatedVehicles = currentVehicles.map(vehicle =>
            vehicle.id === id ? { ...vehicle, ...updates } : vehicle
        );
        this.vehicles$.next(updatedVehicles);
        this.saveVehicles(updatedVehicles);
    }

    deleteVehicle(id: string): void {
        const currentVehicles = this.vehicles$.value;
        const updatedVehicles = currentVehicles.filter(v => v.id !== id);
        this.vehicles$.next(updatedVehicles);
        this.saveVehicles(updatedVehicles);
    }

    updateVehicleStatus(id: string, status: VehicleStatus): void {
        this.updateVehicle(id, { status });
    }

    searchVehicles(query: string): Observable<Vehicle[]> {
        const lowerQuery = query.toLowerCase();
        return this.vehicles$.pipe(
            map(vehicles => vehicles.filter(v =>
                v.name.toLowerCase().includes(lowerQuery) ||
                v.brand.toLowerCase().includes(lowerQuery) ||
                v.type.toLowerCase().includes(lowerQuery)
            ))
        );
    }

    private loadVehicles(): void {
        const savedVehicles = this.storage.getItem<Vehicle[]>(this.VEHICLES_KEY);

        if (savedVehicles && savedVehicles.length > 0) {
            this.vehicles$.next(savedVehicles);
        } else {
            // Initialize with mock data
            const mockVehicles = this.generateMockVehicles();
            this.vehicles$.next(mockVehicles);
            this.saveVehicles(mockVehicles);
        }
    }

    private saveVehicles(vehicles: Vehicle[]): void {
        this.storage.setItem(this.VEHICLES_KEY, vehicles);
    }

    private generateMockVehicles(): Vehicle[] {
        return [
            // Sedans
            {
                id: 'v1',
                name: 'Camry',
                brand: 'Toyota',
                type: VehicleType.SEDAN,
                pricePerDay: 2500,
                kmPerDay: 200,
                status: VehicleStatus.AVAILABLE,
                imageUrl: '',
                year: 2023,
                fuelType: 'Petrol',
                transmission: 'Automatic',
                seats: 5,
                description: 'Comfortable sedan perfect for city and highway drives.',
                features: ['Bluetooth', 'GPS Navigation', 'Climate Control', 'Airbags']
            },
            {
                id: 'v2',
                name: 'Accord',
                brand: 'Honda',
                type: VehicleType.SEDAN,
                pricePerDay: 2400,
                kmPerDay: 200,
                status: VehicleStatus.AVAILABLE,
                imageUrl: '',
                year: 2023,
                fuelType: 'Petrol',
                transmission: 'Automatic',
                seats: 5,
                description: 'Reliable and spacious sedan with premium features.',
                features: ['Sunroof', 'Bluetooth', 'Reverse Camera', 'Cruise Control']
            },
            {
                id: 'v3',
                name: 'Verna',
                brand: 'Hyundai',
                type: VehicleType.SEDAN,
                pricePerDay: 1800,
                kmPerDay: 180,
                status: VehicleStatus.AVAILABLE,
                imageUrl: '',
                year: 2024,
                fuelType: 'Diesel',
                transmission: 'Manual',
                seats: 5,
                description: 'Stylish and fuel-efficient sedan for economical travel.',
                features: ['Touchscreen', 'Bluetooth', 'Automatic Climate Control']
            },
            {
                id: 'v4',
                name: 'City',
                brand: 'Honda',
                type: VehicleType.SEDAN,
                pricePerDay: 2000,
                kmPerDay: 200,
                status: VehicleStatus.AVAILABLE,
                imageUrl: '',
                year: 2023,
                fuelType: 'Petrol',
                transmission: 'CVT',
                seats: 5,
                description: 'Popular city sedan with excellent mileage.',
                features: ['Lane Watch Camera', 'Touchscreen', 'Bluetooth']
            },
            {
                id: 'v5',
                name: 'Ciaz',
                brand: 'Maruti Suzuki',
                type: VehicleType.SEDAN,
                pricePerDay: 1600,
                kmPerDay: 150,
                status: VehicleStatus.BOOKED,
                imageUrl: '',
                year: 2023,
                fuelType: 'Petrol',
                transmission: 'Automatic',
                seats: 5,
                description: 'Spacious and comfortable sedan for long journeys.',
                features: ['Smart Play Studio', 'Cruise Control', 'Auto AC']
            },

            // SUVs
            {
                id: 'v6',
                name: 'Fortuner',
                brand: 'Toyota',
                type: VehicleType.SUV,
                pricePerDay: 5500,
                kmPerDay: 250,
                status: VehicleStatus.AVAILABLE,
                imageUrl: '',
                year: 2024,
                fuelType: 'Diesel',
                transmission: 'Automatic',
                seats: 7,
                description: 'Premium SUV with powerful performance and luxury features.',
                features: ['4WD', 'Leather Seats', 'Sunroof', '360 Camera', 'Hill Assist']
            },
            {
                id: 'v7',
                name: 'XUV700',
                brand: 'Mahindra',
                type: VehicleType.SUV,
                pricePerDay: 4200,
                kmPerDay: 250,
                status: VehicleStatus.AVAILABLE,
                imageUrl: '',
                year: 2024,
                fuelType: 'Diesel',
                transmission: 'Automatic',
                seats: 7,
                description: 'Feature-packed SUV with advanced driver assistance.',
                features: ['ADAS', 'Panoramic Sunroof', 'Sony Sound', 'Wireless Charging']
            },
            {
                id: 'v8',
                name: 'Creta',
                brand: 'Hyundai',
                type: VehicleType.SUV,
                pricePerDay: 3200,
                kmPerDay: 200,
                status: VehicleStatus.AVAILABLE,
                imageUrl: '',
                year: 2024,
                fuelType: 'Petrol',
                transmission: 'Automatic',
                seats: 5,
                description: 'Modern compact SUV with premium interiors.',
                features: ['Ventilated Seats', 'Panoramic Sunroof', 'Wireless Charger']
            },
            {
                id: 'v9',
                name: 'Seltos',
                brand: 'Kia',
                type: VehicleType.SUV,
                pricePerDay: 3000,
                kmPerDay: 200,
                status: VehicleStatus.AVAILABLE,
                imageUrl: '',
                year: 2023,
                fuelType: 'Diesel',
                transmission: 'Automatic',
                seats: 5,
                description: 'Bold and stylish SUV with cutting-edge technology.',
                features: ['UVO Connect', 'Bose Sound', 'Air Purifier', 'Sunroof']
            },
            {
                id: 'v10',
                name: 'Compass',
                brand: 'Jeep',
                type: VehicleType.SUV,
                pricePerDay: 4500,
                kmPerDay: 220,
                status: VehicleStatus.AVAILABLE,
                imageUrl: '',
                year: 2023,
                fuelType: 'Diesel',
                transmission: 'Automatic',
                seats: 5,
                description: 'Rugged SUV for adventure seekers.',
                features: ['4x4', 'Terrain Modes', 'Panoramic Sunroof', 'Beats Audio']
            },

            // Hatchbacks
            {
                id: 'v11',
                name: 'Swift',
                brand: 'Maruti Suzuki',
                type: VehicleType.HATCHBACK,
                pricePerDay: 1200,
                kmPerDay: 150,
                status: VehicleStatus.AVAILABLE,
                imageUrl: '',
                year: 2024,
                fuelType: 'Petrol',
                transmission: 'Manual',
                seats: 5,
                description: 'Best-selling hatchback with sporty design.',
                features: ['Touchscreen', 'Bluetooth', 'Rear Parking Sensors']
            },
            {
                id: 'v12',
                name: 'i20',
                brand: 'Hyundai',
                type: VehicleType.HATCHBACK,
                pricePerDay: 1500,
                kmPerDay: 150,
                status: VehicleStatus.AVAILABLE,
                imageUrl: '',
                year: 2024,
                fuelType: 'Petrol',
                transmission: 'Automatic',
                seats: 5,
                description: 'Premium hatchback with excellent features.',
                features: ['Sunroof', 'Wireless Charging', 'Digital Cluster']
            },
            {
                id: 'v13',
                name: 'Baleno',
                brand: 'Maruti Suzuki',
                type: VehicleType.HATCHBACK,
                pricePerDay: 1300,
                kmPerDay: 150,
                status: VehicleStatus.AVAILABLE,
                imageUrl: '',
                year: 2023,
                fuelType: 'Petrol',
                transmission: 'CVT',
                seats: 5,
                description: 'Spacious and comfortable premium hatchback.',
                features: ['Head-Up Display', 'Smart Play', '360 View Camera']
            },
            {
                id: 'v14',
                name: 'Altroz',
                brand: 'Tata',
                type: VehicleType.HATCHBACK,
                pricePerDay: 1400,
                kmPerDay: 150,
                status: VehicleStatus.BOOKED,
                imageUrl: '',
                year: 2023,
                fuelType: 'Diesel',
                transmission: 'Manual',
                seats: 5,
                description: '5-star safety rated premium hatchback.',
                features: ['Digital Cluster', 'Harman Sound', 'Cruise Control']
            },
            {
                id: 'v15',
                name: 'Polo',
                brand: 'Volkswagen',
                type: VehicleType.HATCHBACK,
                pricePerDay: 1700,
                kmPerDay: 150,
                status: VehicleStatus.AVAILABLE,
                imageUrl: '',
                year: 2022,
                fuelType: 'Petrol',
                transmission: 'Manual',
                seats: 5,
                description: 'German engineering in a compact package.',
                features: ['Touchscreen', 'Cruise Control', 'Rain Sensing Wipers']
            },

            // Luxury
            {
                id: 'v16',
                name: 'C-Class',
                brand: 'Mercedes-Benz',
                type: VehicleType.LUXURY,
                pricePerDay: 8000,
                kmPerDay: 200,
                status: VehicleStatus.AVAILABLE,
                imageUrl: '',
                year: 2024,
                fuelType: 'Petrol',
                transmission: 'Automatic',
                seats: 5,
                description: 'Luxury sedan with cutting-edge technology.',
                features: ['MBUX', 'Burmester Sound', 'Panoramic Roof', 'Ambient Lighting']
            },
            {
                id: 'v17',
                name: '5 Series',
                brand: 'BMW',
                type: VehicleType.LUXURY,
                pricePerDay: 7500,
                kmPerDay: 200,
                status: VehicleStatus.AVAILABLE,
                imageUrl: '',
                year: 2023,
                fuelType: 'Diesel',
                transmission: 'Automatic',
                seats: 5,
                description: 'Ultimate driving machine with luxury interiors.',
                features: ['iDrive', 'Harman Kardon', 'Gesture Control', 'Head-Up Display']
            },
            {
                id: 'v18',
                name: 'A4',
                brand: 'Audi',
                type: VehicleType.LUXURY,
                pricePerDay: 7000,
                kmPerDay: 200,
                status: VehicleStatus.AVAILABLE,
                imageUrl: '',
                year: 2023,
                fuelType: 'Petrol',
                transmission: 'Automatic',
                seats: 5,
                description: 'Sophisticated luxury sedan with quattro technology.',
                features: ['Virtual Cockpit', 'Matrix LED', 'Bang & Olufsen', 'quattro AWD']
            },
            {
                id: 'v19',
                name: 'S-Class',
                brand: 'Mercedes-Benz',
                type: VehicleType.LUXURY,
                pricePerDay: 12000,
                kmPerDay: 250,
                status: VehicleStatus.MAINTENANCE,
                imageUrl: '',
                year: 2024,
                fuelType: 'Petrol',
                transmission: 'Automatic',
                seats: 5,
                description: 'Flagship luxury sedan with unmatched comfort.',
                features: ['MBUX Hyperscreen', 'Air Suspension', 'Executive Seats', '4MATIC']
            },
            {
                id: 'v20',
                name: 'XC90',
                brand: 'Volvo',
                type: VehicleType.LUXURY,
                pricePerDay: 7800,
                kmPerDay: 220,
                status: VehicleStatus.AVAILABLE,
                imageUrl: '',
                year: 2023,
                fuelType: 'Diesel',
                transmission: 'Automatic',
                seats: 7,
                description: 'Luxury SUV with Scandinavian elegance and safety.',
                features: ['Pilot Assist', 'Bowers & Wilkins', 'Air Suspension', 'Massage Seats']
            },

            // Electric
            {
                id: 'v21',
                name: 'Model 3',
                brand: 'Tesla',
                type: VehicleType.ELECTRIC,
                pricePerDay: 6500,
                kmPerDay: 300,
                status: VehicleStatus.AVAILABLE,
                imageUrl: '',
                year: 2024,
                fuelType: 'Electric',
                transmission: 'Automatic',
                seats: 5,
                description: 'High-performance electric sedan with autopilot.',
                features: ['Autopilot', 'Supercharging', 'Premium Audio', 'OTA Updates']
            },
            {
                id: 'v22',
                name: 'Nexon EV',
                brand: 'Tata',
                type: VehicleType.ELECTRIC,
                pricePerDay: 2800,
                kmPerDay: 250,
                status: VehicleStatus.AVAILABLE,
                imageUrl: '',
                year: 2024,
                fuelType: 'Electric',
                transmission: 'Automatic',
                seats: 5,
                description: 'India\'s best-selling electric SUV.',
                features: ['Ziptron Tech', 'Fast Charging', 'Connected Car', 'iRA AI']
            },
            {
                id: 'v23',
                name: 'ZS EV',
                brand: 'MG',
                type: VehicleType.ELECTRIC,
                pricePerDay: 3500,
                kmPerDay: 280,
                status: VehicleStatus.AVAILABLE,
                imageUrl: '',
                year: 2023,
                fuelType: 'Electric',
                transmission: 'Automatic',
                seats: 5,
                description: 'Feature-rich electric SUV with long range.',
                features: ['8-year Battery Warranty', 'PM 2.5 Filter', 'Panoramic Sunroof']
            },
            {
                id: 'v24',
                name: 'EQS',
                brand: 'Mercedes-Benz',
                type: VehicleType.ELECTRIC,
                pricePerDay: 15000,
                kmPerDay: 300,
                status: VehicleStatus.AVAILABLE,
                imageUrl: '',
                year: 2024,
                fuelType: 'Electric',
                transmission: 'Automatic',
                seats: 5,
                description: 'Luxury electric sedan with hyperscreen technology.',
                features: ['MBUX Hyperscreen', 'Air Suspension', 'Executive Seats', 'Range 700km']
            },
            {
                id: 'v25',
                name: 'i4',
                brand: 'BMW',
                type: VehicleType.ELECTRIC,
                pricePerDay: 9500,
                kmPerDay: 300,
                status: VehicleStatus.BOOKED,
                imageUrl: '',
                year: 2024,
                fuelType: 'Electric',
                transmission: 'Automatic',
                seats: 5,
                description: 'Electric gran coupe with BMW driving dynamics.',
                features: ['Curved Display', 'iDrive 8', 'Harman Kardon', 'Fast Charging']
            },

            // Additional vehicles
            {
                id: 'v26',
                name: 'Ertiga',
                brand: 'Maruti Suzuki',
                type: VehicleType.SUV,
                pricePerDay: 2200,
                kmPerDay: 180,
                status: VehicleStatus.AVAILABLE,
                imageUrl: '',
                year: 2023,
                fuelType: 'Petrol',
                transmission: 'Manual',
                seats: 7,
                description: 'Practical 7-seater MPV for family trips.',
                features: ['Smart Play', 'Cruise Control', 'Rear AC Vents']
            },
            {
                id: 'v27',
                name: 'Scorpio N',
                brand: 'Mahindra',
                type: VehicleType.SUV,
                pricePerDay: 3800,
                kmPerDay: 200,
                status: VehicleStatus.AVAILABLE,
                imageUrl: '',
                year: 2024,
                fuelType: 'Diesel',
                transmission: 'Automatic',
                seats: 7,
                description: 'Rugged SUV with modern features and powerful engine.',
                features: ['4WD', 'AdrenoX', 'Cruise Control', 'Sony 3D Sound']
            },
            {
                id: 'v28',
                name: 'Kushaq',
                brand: 'Skoda',
                type: VehicleType.SUV,
                pricePerDay: 3300,
                kmPerDay: 200,
                status: VehicleStatus.AVAILABLE,
                imageUrl: '',
                year: 2024,
                fuelType: 'Petrol',
                transmission: 'Automatic',
                seats: 5,
                description: 'European SUV with safety and performance.',
                features: ['Virtual Cockpit', 'Ventilated Seats', 'Wireless Charging']
            },
            {
                id: 'v29',
                name: 'Thar',
                brand: 'Mahindra',
                type: VehicleType.SUV,
                pricePerDay: 4000,
                kmPerDay: 200,
                status: VehicleStatus.AVAILABLE,
                imageUrl: '',
                year: 2023,
                fuelType: 'Diesel',
                transmission: 'Manual',
                seats: 4,
                description: 'Iconic off-roader for adventure enthusiasts.',
                features: ['4WD', 'Convertible Top', 'Hill Hold', 'Cruise Control']
            },
            {
                id: 'v30',
                name: 'Innova Crysta',
                brand: 'Toyota',
                type: VehicleType.SUV,
                pricePerDay: 3600,
                kmPerDay: 200,
                status: VehicleStatus.AVAILABLE,
                imageUrl: '',
                year: 2023,
                fuelType: 'Diesel',
                transmission: 'Automatic',
                seats: 7,
                description: 'Most reliable MPV for comfortable journeys.',
                features: ['Touchscreen', 'Rear AC', 'Cruise Control', 'Leather Seats']
            }
        ];
    }
}
