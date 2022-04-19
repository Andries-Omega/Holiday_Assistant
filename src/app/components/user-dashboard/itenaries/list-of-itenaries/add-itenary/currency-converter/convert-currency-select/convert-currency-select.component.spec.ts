import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertCurrencySelectComponent } from './convert-currency-select.component';

describe('ConvertCurrencySelectComponent', () => {
  let component: ConvertCurrencySelectComponent;
  let fixture: ComponentFixture<ConvertCurrencySelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvertCurrencySelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvertCurrencySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
