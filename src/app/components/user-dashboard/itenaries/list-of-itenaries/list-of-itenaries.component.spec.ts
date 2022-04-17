import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfItenariesComponent } from './list-of-itenaries.component';

describe('ListOfItenariesComponent', () => {
  let component: ListOfItenariesComponent;
  let fixture: ComponentFixture<ListOfItenariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfItenariesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfItenariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
