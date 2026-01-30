import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehicles.html',
  styleUrls: ['./vehicles.css']
})
export class VehiclesComponent {
  constructor(private router: Router) {}
bookVehicle(_t5: { id: number; name: string; type: string; price: number; kmPerDay: number; available: boolean; }) {
throw new Error('Method not implemented.');
}

  vehicles = [
  { id: 1, name: 'Hyundai i20', type: 'Hatchback', price: 1800, kmPerDay: 120, available: true },
  { id: 2, name: 'Honda City', type: 'Sedan', price: 2500, kmPerDay: 150, available: false },
  { id: 3, name: 'Creta', type: 'SUV', price: 3200, kmPerDay: 200, available: true },
  { id: 4, name: 'Swift Dzire', type: 'Sedan', price: 2000, kmPerDay: 150, available: true },
  { id: 5, name: 'Baleno', type: 'Hatchback', price: 1700, kmPerDay: 120, available: true },
  { id: 6, name: 'Verna', type: 'Sedan', price: 2700, kmPerDay: 160, available: true },
  { id: 7, name: 'Fortuner', type: 'SUV', price: 5000, kmPerDay: 250, available: false },
  { id: 8, name: 'Brezza', type: 'SUV', price: 2800, kmPerDay: 180, available: true },
  { id: 9, name: 'XUV 700', type: 'SUV', price: 4500, kmPerDay: 220, available: true },
  { id: 10, name: 'Alto', type: 'Hatchback', price: 1200, kmPerDay: 100, available: true },
  
];
onBook(car: any) {
    localStorage.setItem('selectedVehicle', JSON.stringify(car));
    this.router.navigate(['/book-vehicle']);
  }


}
