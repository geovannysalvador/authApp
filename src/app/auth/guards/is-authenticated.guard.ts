import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {


  // const url = state.url;
  // localStorage.setItem('url', url)

  // Saber si esta autenticado o no. el estatus
  const authService = inject(AuthService);
  const router = inject( Router);

  if ( authService.authStatus() === AuthStatus.authenticated ){
    return true
  }

  // Si no esta autenticado
  // const url = state.url;
  // localStorage.setItem('url', url)

  router.navigateByUrl('/auth/login')
  return false;
};
