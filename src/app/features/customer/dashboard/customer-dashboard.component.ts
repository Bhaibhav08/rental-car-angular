import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { VehicleService } from '../../../core/services/vehicle.service';
import { AuthService } from '../../../core/services/auth.service';
import { Vehicle } from '../../../core/models/vehicle.model';
import { VehicleCardComponent } from '../../../shared/components/vehicle-card/vehicle-card.component';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, VehicleCardComponent],
  template: `
    <div style="min-height: 100vh; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);">
      <!-- Modern Hero Section -->
      <section style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 48px 24px; position: relative; overflow: hidden;">
        <!-- Animated Background Circles -->
        <div style="position: absolute; top: -50px; left: -50px; width: 200px; height: 200px; background: rgba(255,255,255,0.1); border-radius: 50%; filter: blur(40px);"></div>
        <div style="position: absolute; bottom: -50px; right: -50px; width: 250px; height: 250px; background: rgba(255,255,255,0.1); border-radius: 50%; filter: blur(40px);"></div>
        
        <div style="max-width: 1280px; margin: 0 auto; position: relative; z-index: 1;">
          <div style="text-align: center;">
            <h1 style="font-size: 40px; font-weight: 800; color: white; margin: 0 0 12px 0; text-shadow: 0 4px 12px rgba(0,0,0,0.2);">
              Welcome, {{ userName }}! 🚗
            </h1>
            <p style="font-size: 18px; color: rgba(255,255,255,0.95); margin: 0 0 32px 0; font-weight: 300;">
              Discover premium cars for every journey
            </p>
            <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
              <a routerLink="/customer/vehicles" 
                 style="padding: 14px 32px; background: white; color: #667eea; font-weight: 700; border-radius: 12px; text-decoration: none; box-shadow: 0 8px 20px rgba(0,0,0,0.15); transition: all 0.3s; display: inline-block;"
                 onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 12px 28px rgba(0,0,0,0.2)'"
                 onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 8px 20px rgba(0,0,0,0.15)'">
                Browse All Vehicles →
              </a>
              <a routerLink="/customer/bookings" 
                 style="padding: 14px 32px; background: rgba(255,255,255,0.2); backdrop-filter: blur(10px); color: white; font-weight: 700; border-radius: 12px; text-decoration: none; border: 2px solid rgba(255,255,255,0.3); transition: all 0.3s; display: inline-block;"
                 onmouseover="this.style.background='rgba(255,255,255,0.3)'; this.style.transform='translateY(-4px)'"
                 onmouseout="this.style.background='rgba(255,255,255,0.2)'; this.style.transform='translateY(0)'">
                My Bookings
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section style="max-width: 1280px; margin: -40px auto 0; padding: 0 24px 40px; position: relative; z-index: 2;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
          <div style="background: linear-gradient(135deg, white 0%, #f8f9fa 100%); padding: 24px; border-radius: 16px; box-shadow: 0 8px 20px rgba(0,0,0,0.08); border: 1px solid rgba(0,0,0,0.05);">
            <div style="font-size: 36px; margin-bottom: 12px;">🚗</div>
            <h3 style="font-size: 16px; font-weight: 700; color: #1a202c; margin: 0 0 6px 0;">30+ Vehicles</h3>
            <p style="font-size: 13px; color: #6b7280; margin: 0;">Premium to economy</p>
          </div>
          <div style="background: linear-gradient(135deg, white 0%, #f8f9fa 100%); padding: 24px; border-radius: 16px; box-shadow: 0 8px 20px rgba(0,0,0,0.08); border: 1px solid rgba(0,0,0,0.05);">
            <div style="font-size: 36px; margin-bottom: 12px;">⚡</div>
            <h3 style="font-size: 16px; font-weight: 700; color: #1a202c; margin: 0 0 6px 0;">Instant Booking</h3>
            <p style="font-size: 13px; color: #6b7280; margin: 0;">Book in seconds</p>
          </div>
          <div style="background: linear-gradient(135deg, white 0%, #f8f9fa 100%); padding: 24px; border-radius: 16px; box-shadow: 0 8px 20px rgba(0,0,0,0.08); border: 1px solid rgba(0,0,0,0.05);">
            <div style="font-size: 36px; margin-bottom: 12px;">🔒</div>
            <h3 style="font-size: 16px; font-weight: 700; color: #1a202c; margin: 0 0 6px 0;">100% Secure</h3>
            <p style="font-size: 13px; color: #6b7280; margin: 0;">Safe payments</p>
          </div>
          <div style="background: linear-gradient(135deg, white 0%, #f8f9fa 100%); padding: 24px; border-radius: 16px; box-shadow: 0 8px 20px rgba(0,0,0,0.08); border: 1px solid rgba(0,0,0,0.05);">
            <div style="font-size: 36px; margin-bottom: 12px;">📞</div>
            <h3 style="font-size: 16px; font-weight: 700; color: #1a202c; margin: 0 0 6px 0;">24/7 Support</h3>
            <p style="font-size: 13px; color: #6b7280; margin: 0;">Always here</p>
          </div>
        </div>
      </section>

      <!-- Featured Vehicles -->
      <section style="max-width: 1280px; margin: 0 auto; padding: 40px 24px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 32px;">
          <div>
            <h2 style="font-size: 32px; font-weight: 800; margin: 0 0 8px 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
              Featured Vehicles
            </h2>
            <p style="font-size: 14px; color: #6b7280; margin: 0;">Handpicked cars for you</p>
          </div>
          <a routerLink="/customer/vehicles" 
             style="font-size: 14px; color: #667eea; font-weight: 600; text-decoration: none; display: flex; align-items: center; gap: 6px;"
             onmouseover="this.style.gap='10px'"
             onmouseout="this.style.gap='6px'">
            View All
            <span style="transition: all 0.3s;">→</span>
          </a>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px;">
          <app-vehicle-card 
            *ngFor="let vehicle of featuredVehicles" 
            [vehicle]="vehicle"
            [viewMode]="'customer'">
          </app-vehicle-card>
        </div>
      </section>
    </div>
  `,
  styles: []
})
export class CustomerDashboardComponent implements OnInit {
  private vehicleService = inject(VehicleService);
  private authService = inject(AuthService);

  featuredVehicles: Vehicle[] = [];
  userName = '';

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    this.userName = user?.fullName || 'Guest';

    this.vehicleService.getAvailableVehicles().subscribe(vehicles => {
      this.featuredVehicles = vehicles.slice(0, 6);
    });
  }
}
