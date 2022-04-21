import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfCurrenciesComponent } from './list-of-currencies.component';

describe('ListOfCurrenciesComponent', () => {
  let component: ListOfCurrenciesComponent;
  let fixture: ComponentFixture<ListOfCurrenciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfCurrenciesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfCurrenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
