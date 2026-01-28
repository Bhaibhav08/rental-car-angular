import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Layout } from './layout/layout';
import { Dashboard } from './dashboard/dashboard';
import { Vehicles } from './vehicles/vehicles';

export const routes: Routes = [

  // 🔹 Default redirect
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // 🔹 Login page (no layout)
  {
    path: 'login',
    component: Login
  },

  // 🔹 Pages with layout
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        component: Dashboard
      },
      {
        path: 'vehicles',
        component: Vehicles
      }
    ]
  }
];
