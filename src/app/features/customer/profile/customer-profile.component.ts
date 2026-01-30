import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';

@Component({
    selector: 'app-customer-profile',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="profile-page">
      <div class="container">
        <h1>My Profile</h1>
        <div class="profile-card" *ngIf="user">
          <div class="profile-header">
            <div class="avatar">{{ user.fullName.charAt(0) }}</div>
            <div>
              <h2>{{ user.fullName }}</h2>
              <p class="role-badge">{{ user.role }}</p>
            </div>
          </div>
          <div class="profile-details">
            <div class="detail-row">
              <span class="label">Email:</span>
              <span class="value">{{ user.email }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Phone:</span>
              <span class="value">{{ user.phone || 'Not provided' }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Username:</span>
              <span class="value">{{ user.username }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Member Since:</span>
              <span class="value">{{ user.createdAt | date }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .profile-page { padding: 40px 24px; min-height: calc(100vh - 70px); background: #f9fafb; }
    .container { max-width: 800px; margin: 0 auto; }
    h1 { font-size: 32px; font-weight: 700; margin-bottom: 32px; }
    .profile-card { background: white; padding: 32px; border-radius: 16px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); }
    .profile-header { display: flex; align-items: center; gap: 20px; margin-bottom: 32px; padding-bottom: 24px; border-bottom: 2px solid #e5e7eb; }
    .avatar { width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; display: flex; align-items: center; justify-content: center; font-size: 36px; font-weight: 700; }
    .profile-header h2 { margin: 0; font-size: 24px; }
    .role-badge { display: inline-block; margin-top: 4px; padding: 4px 12px; background: #e5e7eb; border-radius: 12px; font-size: 12px; font-weight: 600; text-transform: uppercase; }
    .profile-details { display: flex; flex-direction: column; gap: 16px; }
    .detail-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #f3f4f6; }
    .label { font-weight: 600; color: #6b7280; }
    .value { color: #1f2937; }
  `]
})
export class CustomerProfileComponent implements OnInit {
    private authService = inject(AuthService);
    user: User | null = null;

    ngOnInit() {
        this.user = this.authService.getCurrentUser();
    }
}
