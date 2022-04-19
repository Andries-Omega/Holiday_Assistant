import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupDesktopComponent } from './signup-desktop.component';

describe('SignupDesktopComponent', () => {
  let component: SignupDesktopComponent;
  let fixture: ComponentFixture<SignupDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupDesktopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
