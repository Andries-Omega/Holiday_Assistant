import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileOptionsComponent } from './mobile-options.component';

describe('MobileOptionsComponent', () => {
  let component: MobileOptionsComponent;
  let fixture: ComponentFixture<MobileOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
