import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { environmets } from 'src/environments/environments';
import { AuthStatus, LoginResponse, User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private readonly baseUrl:string =  environmets.baseUrl;
  private http = inject( HttpClient );

  private _currentUser = signal<User|null>(null);
  private _authstatus = signal<AuthStatus>( AuthStatus.checking );

  //! publicas para usar fuera
  public currentUser = computed( () => this._currentUser() );
  public authStatus = computed( () => this._authstatus() );
  //! publicas para usar fuera


  login( email:string, password:string ):Observable<boolean>{

    const url = `${this.baseUrl}/auth/login`
    // const body = {email:email, password:password} Es lo mismo que abajo
    const body = {email, password}

    return this.http.post<LoginResponse>( url, body )
      .pipe(
        // si todo sale bien hace esto.
        tap( ({ user, token }) =>{
          this._currentUser.set(user);
          this._authstatus.set(AuthStatus.authenticated);
          localStorage.setItem('token', token)
          console.log({user,token});

        }),
        // transformacion del problema boolean del login
        map( () => true )
        // TODO si sale mal el login
      );


  }


}
