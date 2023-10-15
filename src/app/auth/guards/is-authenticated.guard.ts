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
    return true;
  }

  // Para que no me saque si entro con mis credenciales. No es necesario pero aca se dejo
  // if ( authService.authStatus() === AuthStatus.checking ){
  //   return false;
  // }

  // Si no esta autenticado
  // const url = state.url;
  // localStorage.setItem('url', url)

  router.navigateByUrl('/auth/login')
  return false;
};
