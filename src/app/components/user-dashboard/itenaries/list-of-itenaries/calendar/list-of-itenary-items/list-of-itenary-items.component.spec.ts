import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfItenaryItemsComponent } from './list-of-itenary-items.component';

describe('ListOfItenaryItemsComponent', () => {
  let component: ListOfItenaryItemsComponent;
  let fixture: ComponentFixture<ListOfItenaryItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfItenaryItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfItenaryItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
