import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfilePasswordPopupComponent } from './update-profile-password-popup.component';

describe('UpdateProfilePasswordPopupComponent', () => {
  let component: UpdateProfilePasswordPopupComponent;
  let fixture: ComponentFixture<UpdateProfilePasswordPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProfilePasswordPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProfilePasswordPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
