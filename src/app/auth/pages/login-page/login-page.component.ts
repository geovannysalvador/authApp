import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  private fb = inject( FormBuilder );
  private authService = inject(AuthService);

  public myForm: FormGroup = this.fb.group({
    email: ['prueba1@gmail.com', [ Validators.required, Validators.email ]],
    password: ['123456', [ Validators.required, Validators.minLength(6) ]],
  })

  login(){
    const {email, password} = this.myForm.value;

    this.authService.login(email, password)
      .subscribe( {
        next: () => console.log('Todo funciona bien'),
        error: (messageError) => {
          // console.log({ loginError: err });
          Swal.fire('Error', messageError, 'error' )

        }
      } )
  }

}
