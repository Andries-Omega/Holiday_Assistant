import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaseTwoIComponent } from './phase-two-i.component';

describe('PhaseTwoIComponent', () => {
  let component: PhaseTwoIComponent;
  let fixture: ComponentFixture<PhaseTwoIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhaseTwoIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaseTwoIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
