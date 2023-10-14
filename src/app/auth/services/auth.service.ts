import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environmets } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private readonly baseUrl:string =  environmets.baseUrl;
  private http = inject( HttpClient );

  private _currentUser = signal<User|null>(null);
  private _authstatus = signal<AuthStatus>();


  login( email:string, password:string ):Observable<boolean>{

    return of(true)
  }


}
