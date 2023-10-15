import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  private fb = inject( FormBuilder );
  private authService = inject( AuthService );
  private router = inject( Router );

  public myForm: FormGroup = this.fb.group({
    name: ['Geovanny', [ Validators.required, Validators.minLength(3) ]],
    email: ['prubaregistro@gmail.com', [ Validators.required, Validators.email ]],
    password: ['123456', [ Validators.required, Validators.minLength(6) ]],
  })

  register(){
    const {name, email, password} = this.myForm.value;

    this.authService.register(name, email, password)
      .subscribe( {
        // Si tofo funciona bien
        // next: () => console.log('Todo funciona bien'), navegar al dashboard
        next: () => {
          Swal.fire('Registrado', 'Registro Exitoso', 'success')
        },
        error: (messageError) => {
          // console.log({ loginError: err }); si no fuciona mostrar el error de backend
          Swal.fire('No Regristrado', messageError, 'error' )

        }
      } )
  }
}
