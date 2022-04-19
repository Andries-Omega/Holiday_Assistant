import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItenariesComponent } from './itenaries.component';

describe('ItenariesComponent', () => {
  let component: ItenariesComponent;
  let fixture: ComponentFixture<ItenariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItenariesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItenariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
