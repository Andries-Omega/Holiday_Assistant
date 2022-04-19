import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightSwitchComponent } from './lightswitch.component';

describe('LightswitchComponent', () => {
  let component: LightSwitchComponent;
  let fixture: ComponentFixture<LightSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LightSwitchComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LightSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
