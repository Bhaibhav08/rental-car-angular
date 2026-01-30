export enum VehicleType {
    SEDAN = 'Sedan',
    SUV = 'SUV',
    HATCHBACK = 'Hatchback',
    LUXURY = 'Luxury',
    ELECTRIC = 'Electric'
}

export enum VehicleStatus {
    AVAILABLE = 'Available',
    BOOKED = 'Booked',
    MAINTENANCE = 'Maintenance'
}

export interface Vehicle {
    id: string;
    name: string;
    brand: string;
    type: VehicleType;
    pricePerDay: number;
    kmPerDay: number;
    status: VehicleStatus;
    imageUrl: string;
    year: number;
    fuelType: string;
    transmission: string;
    seats: number;
    description: string;
    features: string[];
}
