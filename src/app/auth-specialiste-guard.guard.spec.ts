import { TestBed } from '@angular/core/testing';

import { AuthSpecialisteGuardGuard } from './auth-specialiste-guard.guard';

describe('AuthSpecialisteGuardGuard', () => {
  let guard: AuthSpecialisteGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthSpecialisteGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
