import { Routes } from '@angular/router';

export const CUSTOMER_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./customer-layout/customer-layout.component').then(m => m.CustomerLayoutComponent),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./dashboard/customer-dashboard.component').then(m => m.CustomerDashboardComponent)
            },
            {
                path: 'vehicles',
                loadComponent: () => import('./vehicles/vehicle-list.component').then(m => m.VehicleListComponent)
            },
            {
                path: 'vehicles/:id',
                loadComponent: () => import('./vehicles/vehicle-detail.component').then(m => m.VehicleDetailComponent)
            },
            {
                path: 'book/:vehicleId',
                loadComponent: () => import('./booking/booking-form.component').then(m => m.BookingFormComponent)
            },
            {
                path: 'bookings',
                loadComponent: () => import('./bookings/booking-history.component').then(m => m.BookingHistoryComponent)
            },
            {
                path: 'profile',
                loadComponent: () => import('./profile/customer-profile.component').then(m => m.CustomerProfileComponent)
            },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    }
];
