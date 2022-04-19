import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashOptionsComponent } from './dash-options.component';

describe('DashOptionsComponent', () => {
  let component: DashOptionsComponent;
  let fixture: ComponentFixture<DashOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
