import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripPopUpComponent } from './trip-pop-up.component';

describe('TripPopUpComponent', () => {
  let component: TripPopUpComponent;
  let fixture: ComponentFixture<TripPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TripPopUpComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
