export interface Customer {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    address?: string;
    licenseNumber?: string;
    totalBookings: number;
    createdAt: Date;
}
