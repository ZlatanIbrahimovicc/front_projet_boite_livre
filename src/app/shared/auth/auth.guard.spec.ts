import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { needLoginGuard, needLogOutGuard } from './auth.guard';

describe('guardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => needLoginGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
