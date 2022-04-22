import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsForHolidayPopUpComponent } from './options-for-holiday-pop-up.component';

describe('OptionsForHolidayPopUpComponent', () => {
  let component: OptionsForHolidayPopUpComponent;
  let fixture: ComponentFixture<OptionsForHolidayPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionsForHolidayPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsForHolidayPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
