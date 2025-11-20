import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

/**
 * HTTP interceptor to add authentication token to requests
 * and handle authentication errors.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('authToken');

  // Clone the request and add authorization header if token exists
  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(authReq).pipe(
    catchError((error) => {
      // Handle 401 Unauthorized errors
      if (error.status === 401) {
        localStorage.removeItem('authToken');
        router.navigate(['/sign-in'], {
          queryParams: { sessionExpired: 'true' }
        }).then();
      }

      return throwError(() => error);
    })
  );
};
