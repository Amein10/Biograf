import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn()) {
    router.navigateByUrl(`/login?returnUrl=${encodeURIComponent(state.url)}`);
    return false;
  }

  // Midlertidigt: alle loggede ind må se admin,
  // fordi API ikke har roles endnu.
  return true;
};
