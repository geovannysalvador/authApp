import { Component, inject } from '@angular/core';
import { Router, } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  private fb = inject( FormBuilder );
  private authService = inject( AuthService );
  private router = inject( Router );

  public myForm: FormGroup = this.fb.group({
    email: ['prueba1@gmail.com', [ Validators.required, Validators.email ]],
    password: ['123456', [ Validators.required, Validators.minLength(6) ]],
  })

  login(){
    const {email, password} = this.myForm.value;

    this.authService.login(email, password)
      .subscribe( {
        // Si tofo funciona bien
        // next: () => console.log('Todo funciona bien'), navegar al dashboard
        next: () => this.router.navigateByUrl('/dashboard'),
        error: (messageError) => {
          // console.log({ loginError: err }); si no fuciona mostrar el error de backend
          Swal.fire('Error', messageError, 'error' )

        }
      } )
  }

}
