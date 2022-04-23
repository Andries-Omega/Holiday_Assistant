import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLoginDetailsComponent } from './update-login-details.component';

describe('UpdateLoginDetailsComponent', () => {
  let component: UpdateLoginDetailsComponent;
  let fixture: ComponentFixture<UpdateLoginDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateLoginDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateLoginDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
