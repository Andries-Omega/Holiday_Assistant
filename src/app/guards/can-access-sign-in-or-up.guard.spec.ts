import { TestBed } from '@angular/core/testing';

import { CanAccessSignInOrUpGuard } from './can-access-sign-in-or-up.guard';

describe('CanAccessSignInOrUpGuard', () => {
  let guard: CanAccessSignInOrUpGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanAccessSignInOrUpGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
