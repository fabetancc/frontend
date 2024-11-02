import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule  } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  public formulario: FormGroup<any>;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.construirFormulario();

  }

  public registrarUsuario(): void {

    Swal.fire({
      text: 'Espere...',
      showConfirmButton: false,
      allowEscapeKey: false,
      allowOutsideClick: false
    });

    const result = this.userService.registrarUsuario(this.formulario.value).subscribe({
      next: value => {
        Swal.close();
        this.router.navigate(['auth/login']);
      },
      error: err => {
        Swal.close();
        for (let index = 0; index < err.error.errors.length; index++) {
          
          Swal.fire({
            icon: 'info',
            text: `${err.error.errors[index].msg}`,
            confirmButtonText: 'Cerrar'
          });
         
          break;

        }
      },
      complete: () => {
        result.unsubscribe();
      }
    });
  }

  private construirFormulario(): void {

    this.formulario = this.fb.group({
      nombre: [''],
      correo: [''],
      password: ['']
    });

  }

}
