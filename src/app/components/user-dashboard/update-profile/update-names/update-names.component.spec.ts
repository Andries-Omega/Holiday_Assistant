import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNamesComponent } from './update-names.component';

describe('UpdateNamesComponent', () => {
  let component: UpdateNamesComponent;
  let fixture: ComponentFixture<UpdateNamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateNamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateNamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
