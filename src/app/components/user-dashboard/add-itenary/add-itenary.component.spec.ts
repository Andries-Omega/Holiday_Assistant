import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItenaryComponent } from './add-itenary.component';

describe('AddItenaryComponent', () => {
  let component: AddItenaryComponent;
  let fixture: ComponentFixture<AddItenaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddItenaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItenaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
