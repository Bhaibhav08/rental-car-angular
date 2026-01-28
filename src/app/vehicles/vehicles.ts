import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [],
  templateUrl: './vehicles.html',
  styleUrls: ['./vehicles.css'],
})
export class Vehicles {

  // Vehicle data (Signal)
  vehicleFormData = signal({
    carID: 1,
    brand: 'BMW',
    model: 'X5',
    year: 2023,
    color: 'Black',
    dailyRate: 4500,
    available: true,
    carImage: '',
    regNo: 'KA01AB1234'
  });

  //  API 1: Get vehicle data
  getVehicle() {
    return this.vehicleFormData();
  }

  // API 2: Update vehicle details
  updateVehicle(updatedData: Partial<typeof this.vehicleFormData>) {
    this.vehicleFormData.set({
      ...this.vehicleFormData(),
      ...updatedData
    });
  }

  // API 3: Change availability
  toggleAvailability() {
    this.vehicleFormData.set({
      ...this.vehicleFormData(),
      available: !this.vehicleFormData().available
    });
  }

  //  API 4: Update daily rate
  updateRate(newRate: number) {
    this.vehicleFormData.set({
      ...this.vehicleFormData(),
      dailyRate: newRate
    });
  }

  // API 5: Reset vehicle form
  resetVehicle() {
    this.vehicleFormData.set({
      carID: 0,
      brand: '',
      model: '',
      year: 0,
      color: '',
      dailyRate: 0,
      available: false,
      carImage: '',
      regNo: ''
    });
  }
}
