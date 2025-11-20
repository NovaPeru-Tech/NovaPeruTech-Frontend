import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import {IamStore} from '../../iam/application/iam.store';

/**
 * Auth guard to protect routes that require authentication.
 * Redirects to sign-in page if user is not authenticated.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(IamStore);
  const router = inject(Router);
  const user = store.user();
  const token = localStorage.getItem('authToken');

  if (user && token) {
    return true;
  }

  // Redirect to sign in with return URL
  return router.createUrlTree(['/sign-in'], {
    queryParams: { returnUrl: state.url }
  });
};

/**
 * Guest guard to prevent authenticated users from accessing sign-in/sign-up pages.
 * Redirects to home page if user is already authenticated.
 */
export const guestGuard: CanActivateFn = (route, state) => {
  const store = inject(IamStore);
  const router = inject(Router);

  const user = store.user();
  const token = localStorage.getItem('authToken');

  if (user && token) {
    // Redirect to home if already authenticated
    return router.createUrlTree(['/']);
  }

  return true;
};
