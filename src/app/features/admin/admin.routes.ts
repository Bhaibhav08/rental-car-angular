import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
            },
            {
                path: 'vehicles',
                loadComponent: () => import('./vehicles/vehicle-management.component').then(m => m.VehicleManagementComponent)
            },
            {
                path: 'bookings',
                loadComponent: () => import('./bookings/booking-management.component').then(m => m.BookingManagementComponent)
            },
            {
                path: 'customers',
                loadComponent: () => import('./customers/customer-management.component').then(m => m.CustomerManagementComponent)
            },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    }
];
