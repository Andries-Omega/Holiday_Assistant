import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsForItenaryPopUpComponent } from './options-for-itenary-pop-up.component';

describe('OptionsForItenaryPopUpComponent', () => {
  let component: OptionsForItenaryPopUpComponent;
  let fixture: ComponentFixture<OptionsForItenaryPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionsForItenaryPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsForItenaryPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
