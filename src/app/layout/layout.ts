import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, FormsModule, RouterOutlet, RouterLink],
  templateUrl: './layout.html',
  styleUrls: ['./layout.css']
})
export class Layout {
  searchTerm: string = '';

  constructor(private router: Router) {}

  onSearch() {
    this.router.navigate(['vehicles'], {
      queryParams: { search: this.searchTerm }
    });
  }

  logout() {
    this.router.navigate(['login']);
  }
}
