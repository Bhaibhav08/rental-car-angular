import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';

@Component({
    selector: 'app-admin-layout',
    standalone: true,
    imports: [RouterOutlet, NavbarComponent],
    template: `
    <div class="admin-layout">
      <app-navbar></app-navbar>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
    styles: [`
    .admin-layout {
      min-height: 100vh;
      background: #111827;
    }
    
    .main-content {
      min-height: calc(100vh - 70px);
    }
  `]
})
export class AdminLayoutComponent { }
