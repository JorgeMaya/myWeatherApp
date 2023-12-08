import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { cityDetailsGuard } from './city-details.guard';

describe('cityDetailsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => cityDetailsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
