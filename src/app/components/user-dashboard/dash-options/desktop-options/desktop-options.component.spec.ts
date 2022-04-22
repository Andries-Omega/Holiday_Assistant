import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopOptionsComponent } from './desktop-options.component';

describe('DesktopOptionsComponent', () => {
  let component: DesktopOptionsComponent;
  let fixture: ComponentFixture<DesktopOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesktopOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesktopOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
