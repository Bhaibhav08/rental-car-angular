import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { LandingComponent } from './features/landing/landing.component';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard, customerGuard } from './core/guards/role.guard';

export const routes: Routes = [
  // Public routes
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },

  // Customer routes (protected)
  {
    path: 'customer',
    canActivate: [authGuard, customerGuard],
    loadChildren: () => import('./features/customer/customer.routes').then(m => m.CUSTOMER_ROUTES)
  },

  // Admin routes (protected)
  {
    path: 'admin',
    canActivate: [authGuard, adminGuard],
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES)
  },

  // Wildcard redirect
  { path: '**', redirectTo: '' }
];
