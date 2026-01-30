import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';

@Component({
    selector: 'app-customer-layout',
    standalone: true,
    imports: [RouterOutlet, NavbarComponent],
    template: `
    <div class="customer-layout">
      <app-navbar></app-navbar>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
    styles: [`
    .customer-layout {
      min-height: 100vh;
      background: #f9fafb;
    }
    
    .main-content {
      min-height: calc(100vh - 70px);
    }
  `]
})
export class CustomerLayoutComponent { }
