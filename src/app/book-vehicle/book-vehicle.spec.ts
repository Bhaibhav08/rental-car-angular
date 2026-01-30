import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookVehicle } from './book-vehicle';

describe('BookVehicle', () => {
  let component: BookVehicle;
  let fixture: ComponentFixture<BookVehicle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookVehicle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookVehicle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
