import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { environmets } from 'src/environments/environments';
import { AuthStatus, CheckTokenResponse, LoginResponse, User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl:string =  environmets.baseUrl;
  private http = inject( HttpClient );

  private _currentUser = signal<User|null>(null);
  private _authstatus = signal<AuthStatus>( AuthStatus.checking );

  //! publicas para usar fuera
  public currentUser = computed( () => this._currentUser() );
  public authStatus = computed( () => this._authstatus() );
  //! publicas para usar fuera

  constructor() {
    // Para quese use por pirmera vez
    this.checkAuthStatus().subscribe();
   }

  private setAuthentication( user:User, token:string):boolean{
    this._currentUser.set(user);
    this._authstatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token);

    return true
  }


  login( email:string, password:string ):Observable<boolean>{

    const url = `${this.baseUrl}/auth/login`
    // const body = {email:email, password:password} Es lo mismo que abajo
    const body = {email, password}

    return this.http.post<LoginResponse>( url, body )
      .pipe(
        // si todo sale bien hace esto.
        map( ({ user, token }) => this.setAuthentication( user, token )),

        // TODO si sale mal el login
        catchError( err => throwError( () => err.error.message ))
      );
  }

  register(name:string, email:string, password:string ):Observable<boolean>{

    const url = `${this.baseUrl}/auth/register`
    // const body = {email:email, password:password} Es lo mismo que abajo
    const body = {name, email, password}

    return this.http.post<LoginResponse>( url, body )
      .pipe(
        // si todo sale bien hace esto.
        map( ({ user, token }) => this.setAuthentication( user, token )),

        // TODO si sale mal el login
        catchError( err => throwError( () => err.error.message ))
      );
  }

  checkAuthStatus():Observable<boolean>{

    const url = `${this.baseUrl}/auth/check-token`;
    const token = localStorage.getItem('token')

    // if (!token) return of(false); proceso anterio apara no entrar al login de forma permanete
    if (!token) {
      this.logout();
      return of(false);
    }

    // recibir el heades y el bearer token
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${ token }`);

    return this.http.get<CheckTokenResponse>( url, {headers} )
      .pipe(
        map( ({ user, token }) => this.setAuthentication( user, token )),
        // Error
        catchError( () => {
          this._authstatus.set( AuthStatus.notAuthenticated );
          return of(false);
        } )
      );

  }

  logout(){
    localStorage.removeItem('token');
    this._currentUser.set(null);
    this._authstatus.set( AuthStatus.notAuthenticated );
  }

}
