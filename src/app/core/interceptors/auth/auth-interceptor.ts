import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { catchError, filter, throwError, tap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const accessToken = authService.getAccessToken();
  const refresToken = authService.getRefreshToken();
  const isAuthReq = req.url.includes('/auth/');
  const newReq = req.clone({
    setHeaders: { Authorization: `Bearer ${accessToken}` },
  });

  if (isAuthReq) return next(req);

  return next(newReq).pipe(
    filter((response) => response instanceof HttpResponse),
    catchError((err) => {
      if (accessToken && refresToken && err.status === '401') {
        authService.refresh(refresToken).pipe(
          filter((response) => response instanceof HttpResponse),
          tap({
            error: (error) => {
              if (error.status === '400') {
                authService.logout();
              }
            },
          }),
        );
        return next(
          req.clone({
            setHeaders: { Authorization: `Bearer ${authService.getAccessToken()}` },
          }),
        );
      } else if (err.status === '401') {
        router.navigate(['/login']);
      }
      return throwError(() => err);
    }),
  );
};
