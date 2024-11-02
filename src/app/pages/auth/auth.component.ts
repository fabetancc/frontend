import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

  public formulario: FormGroup<any>;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.construirFormulario();

  }

  public iniciarSesion() {
    const result = this.userService.iniciarSesion(this.formulario.value).subscribe({
      next: value => {
        localStorage.setItem('token', value.token);
        localStorage.setItem('correo', value.usuario.correo);
        localStorage.setItem('nombre', value.usuario.nombre);
        localStorage.setItem('uid', value.usuario.uid);
        this.router.navigate(['tasks']);
      },
      error: err => {
        
        if (err.error.errors) {
          
          for (let index = 0; index < err.error.errors.length; index++) {
            
            Swal.fire({
              icon: 'info',
              text: `${err.error.errors[index].msg}`,
              confirmButtonText: 'Cerrar'
            });
           
            break;
  
          }

        }

        if (err.error.msg) {
          Swal.fire({
            icon: 'info',
            text: `${err.error.msg}`,
            confirmButtonText: 'Cerrar'
          });
        }
      },
      complete: () => {
        result.unsubscribe();
      }
    });
  }

  private construirFormulario(): void {

    this.formulario = this.fb.group({
      correo: [''],
      password: ['']
    });

  }

}
