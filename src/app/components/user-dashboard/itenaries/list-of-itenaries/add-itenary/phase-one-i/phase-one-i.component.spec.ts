import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaseOneIComponent } from './phase-one-i.component';

describe('PhaseOneIComponent', () => {
  let component: PhaseOneIComponent;
  let fixture: ComponentFixture<PhaseOneIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhaseOneIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaseOneIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
