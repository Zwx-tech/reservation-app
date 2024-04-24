import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (!!authService.token) {
    return true;
  }
  if (authService.userSignal() === undefined) {
    authService.authenticate();
  }
  return router.parseUrl('/login');
};

