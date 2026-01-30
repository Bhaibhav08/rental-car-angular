import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../core/services/auth.service';
import { UserRole } from '../core/models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  username = '';
  password = '';
  selectedRole: UserRole = UserRole.CUSTOMER;
  loginError = '';

  UserRole = UserRole; // Make enum available in template

  login() {
    if (!this.username || !this.password) {
      this.loginError = 'Please enter username and password';
      return;
    }

    const success = this.authService.login({
      username: this.username,
      password: this.password,
      role: this.selectedRole
    });

    if (!success) {
      this.loginError = 'Invalid credentials. Try username: "admin" (Admin) or "customer" (Customer)';
    } else {
      this.loginError = '';
    }
  }

  selectRole(role: UserRole) {
    this.selectedRole = role;
    this.loginError = '';
  }
}
