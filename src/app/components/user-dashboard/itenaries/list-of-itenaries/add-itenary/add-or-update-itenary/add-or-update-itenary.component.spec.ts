import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrUpdateItenaryComponent } from './add-or-update-itenary.component';

describe('AddOrUpdateItenaryComponent', () => {
  let component: AddOrUpdateItenaryComponent;
  let fixture: ComponentFixture<AddOrUpdateItenaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrUpdateItenaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrUpdateItenaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
