import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItenaryPopupComponent } from './add-itenary-popup.component';

describe('AddItenaryPopupComponent', () => {
  let component: AddItenaryPopupComponent;
  let fixture: ComponentFixture<AddItenaryPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddItenaryPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItenaryPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
