import { CanActivateFn } from '@angular/router';

export const cityDetailsGuard: CanActivateFn = (route, state) => {
  return true;
};
