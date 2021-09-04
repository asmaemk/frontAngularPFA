import { TestBed } from '@angular/core/testing';

import { AuthClientGuardGuard } from './auth-client-guard.guard';

describe('AuthClientGuardGuard', () => {
  let guard: AuthClientGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthClientGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
