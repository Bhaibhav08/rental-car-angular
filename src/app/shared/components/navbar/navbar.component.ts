import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { User, UserRole } from '../../../core/models/user.model';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive],
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    private authService = inject(AuthService);
    private router = inject(Router);

    currentUser: User | null = null;
    isMenuOpen = false;
    UserRole = UserRole;

    ngOnInit() {
        this.authService.getAuthState().subscribe(state => {
            this.currentUser = state.user;
        });
    }

    logout() {
        this.authService.logout();
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
    }

    closeMenu() {
        this.isMenuOpen = false;
    }

    get isCustomer(): boolean {
        return this.currentUser?.role === UserRole.CUSTOMER;
    }

    get isAdmin(): boolean {
        return this.currentUser?.role === UserRole.ADMIN;
    }
}
