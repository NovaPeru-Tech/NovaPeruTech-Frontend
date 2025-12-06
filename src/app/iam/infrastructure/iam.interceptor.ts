import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { IamStore } from '../application/iam.store';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  const iamStore = inject(IamStore);

  const token = iamStore.currentToken();

  if (token && token.length > 0) {
    const clonedRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(clonedRequest);
  }

  return next(req);
};
