import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfHolidaysComponent } from './list-of-holidays.component';

describe('ListOfHolidaysComponent', () => {
  let component: ListOfHolidaysComponent;
  let fixture: ComponentFixture<ListOfHolidaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfHolidaysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfHolidaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
