import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Vehicle } from '../../../core/models/vehicle.model';

@Component({
  selector: 'app-vehicle-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div [style]="getCardContainerStyle()" 
         (mouseenter)="isHover = true" 
         (mouseleave)="isHover = false">
      
      <!-- Gradient Image Area -->
      <div [style]="getImageStyle()">
        <!-- Car Icon -->
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: white;">
          <svg style="width: 60px; height: 60px; margin-bottom: 8px; opacity: 0.9;" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
          </svg>
          <div style="font-size: 16px; font-weight: 600; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">{{ vehicle.brand }}</div>
          <div style="font-size: 12px; opacity: 0.9;">{{ vehicle.type }}</div>
        </div>
        
        <!-- Status Badge -->
        <div [style]="getStatusBadgeStyle()">
          {{ vehicle.status }}
        </div>
      </div>

      <!-- Content -->
      <div style="padding: 20px;">
        <!-- Vehicle Name -->
        <h3 style="font-size: 20px; font-weight: 700; color: #1a202c; margin: 0 0 16px 0;">
          {{ vehicle.name }}
        </h3>

        <!-- Specs in Pills -->
        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px;">
          <span style="padding: 4px 12px; background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%); border-radius: 20px; font-size: 11px; font-weight: 600; color: #4b5563;">
            ⚙️ {{ vehicle.transmission }}
          </span>
          <span style="padding: 4px 12px; background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%); border-radius: 20px; font-size: 11px; font-weight: 600; color: #4b5563;">
            👥 {{ vehicle.seats }} Seats
          </span>
          <span style="padding: 4px 12px; background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%); border-radius: 20px; font-size: 11px; font-weight: 600; color: #4b5563;">
            ⛽ {{ vehicle.fuelType }}
          </span>
          <span style="padding: 4px 12px; background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%); border-radius: 20px; font-size: 11px; font-weight: 600; color: #4b5563;">
            📏 {{ vehicle.kmPerDay }}km
          </span>
        </div>

        <!-- Price & Action -->
        <div style="display: flex; align-items: center; justify-content: space-between; padding-top: 16px; border-top: 2px solid #f3f4f6;">
          <div>
            <div style="font-size: 11px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Per Day</div>
            <div [style]="'font-size: 24px; font-weight: 800; background: ' + getGradient() + '; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;'">
              ₹{{ vehicle.pricePerDay | number }}
            </div>
          </div>
          
          <div style="display: flex; gap: 8px;">
            <a [routerLink]="['/customer/vehicles', vehicle.id]"
               style="padding: 10px 16px; background: white; color: #4b5563; font-weight: 600; font-size: 13px; border-radius: 12px; text-decoration: none; border: 2px solid #e5e7eb; transition: all 0.3s; cursor: pointer;"
               onmouseover="this.style.borderColor='#9ca3af'; this.style.transform='translateY(-2px)'"
               onmouseout="this.style.borderColor='#e5e7eb'; this.style.transform='translateY(0)'">
              View
            </a>
            <a *ngIf="vehicle.status === 'Available'"
               [routerLink]="['/customer/book', vehicle.id]"
               [style]="getBookButtonStyle()"
               onmouseover="this.style.transform='translateY(-2px) scale(1.05)'; this.style.boxShadow='0 12px 24px -8px rgba(0,0,0,0.3)'"
               onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='0 8px 16px -4px rgba(0,0,0,0.2)'">
              Book Now
            </a>
          </div>
        </div>
      </div>

      <!-- Decorative Corner -->
      <div [style]="getCornerDecorStyle()"></div>
    </div>
  `,
  styles: []
})
export class VehicleCardComponent {
  @Input() vehicle!: Vehicle;
  @Input() showActions = true;
  @Input() viewMode: 'customer' | 'admin' = 'customer';

  isHover = false;

  getCardContainerStyle(): string {
    const shadow = this.isHover
      ? '0 20px 40px -12px rgba(0, 0, 0, 0.25)'
      : '0 10px 20px -8px rgba(0, 0, 0, 0.15)';
    const transform = this.isHover ? 'translateY(-8px)' : 'translateY(0)';

    return `
      position: relative;
      background: white;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: ${shadow};
      transform: ${transform};
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      border: 1px solid rgba(0, 0, 0, 0.06);
    `;
  }

  getImageStyle(): string {
    return `
      position: relative;
      height: 160px;
      background: ${this.getGradient()};
      display: flex;
      align-items: center;
      justify-content: center;
    `;
  }

  getGradient(): string {
    const gradients: Record<string, string> = {
      'Sedan': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'SUV': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'Hatchback': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'Luxury': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'Electric': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'MUV': 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
    };
    return gradients[this.vehicle.type] || gradients['Sedan'];
  }

  getStatusBadgeStyle(): string {
    const colors: Record<string, string> = {
      'Available': 'background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white;',
      'Booked': 'background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white;',
      'Maintenance': 'background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white;'
    };

    return `
      position: absolute;
      top: 12px;
      right: 12px;
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      ${colors[this.vehicle.status] || colors['Available']}
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
  }

  getBookButtonStyle(): string {
    return `
      padding: 10px 20px;
      background: ${this.getGradient()};
      color: white;
      font-weight: 700;
      font-size: 13px;
      border-radius: 12px;
      text-decoration: none;
      border: none;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 8px 16px -4px rgba(0, 0, 0, 0.2);
      transform: translateY(0) scale(1);
      white-space: nowrap;
    `;
  }

  getCornerDecorStyle(): string {
    return `
      position: absolute;
      bottom: 0;
      right: 0;
      width: 80px;
      height: 80px;
      background: ${this.getGradient()};
      opacity: 0.05;
      border-radius: 20px 0 0 0;
      pointer-events: none;
    `;
  }
}
