export enum BookingStatus {
    PENDING = 'Pending',
    CONFIRMED = 'Confirmed',
    ACTIVE = 'Active',
    COMPLETED = 'Completed',
    CANCELLED = 'Cancelled'
}

export interface BookingDocument {
    name: string;
    type: string;
    data: string; // base64 encoded data
    uploadedAt: Date;
}

export interface Booking {
    id: string;
    vehicleId: string;
    vehicleName: string;
    customerId: string;
    customerName: string;
    customerEmail: string;
    startDate: Date;
    endDate: Date;
    totalDays: number;
    totalAmount: number;
    status: BookingStatus;
    idProof?: BookingDocument;
    drivingLicense?: BookingDocument;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateBookingRequest {
    vehicleId: string;
    startDate: Date;
    endDate: Date;
    idProof?: BookingDocument;
    drivingLicense?: BookingDocument;
}
