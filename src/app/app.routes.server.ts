import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Prerender static public routes
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'login',
    renderMode: RenderMode.Prerender
  },
  // Explicitly handle dynamic routes with parameters (must come before wildcards)
  {
    path: 'customer/vehicles/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'customer/book/:vehicleId',
    renderMode: RenderMode.Server
  },
  // Use Client-Side Rendering for all other protected routes
  {
    path: 'customer/**',
    renderMode: RenderMode.Client
  },
  {
    path: 'admin/**',
    renderMode: RenderMode.Client
  }
];
