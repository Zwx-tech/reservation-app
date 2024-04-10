import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = localStorage.getItem('token') ?? '';
  request = request.clone({
    setHeaders: {
      Authorization: token ? `${token}` : '',
    },
  });
  console.log('Running interceptor');
  return next(request);
};
