import { TestBed } from '@angular/core/testing';

import { CanLeaveSignupGuard } from './can-leave-signup.guard';

describe('CanLeaveSignupGuard', () => {
  let guard: CanLeaveSignupGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanLeaveSignupGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
