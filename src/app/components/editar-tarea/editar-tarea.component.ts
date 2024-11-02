import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { TaskService } from '../../services/task.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-tarea',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule
  ],
  templateUrl: './editar-tarea.component.html',
  styleUrl: './editar-tarea.component.scss'
})
export class EditarTareaComponent {

  public formulario: FormGroup;
  readonly dialogRef = inject(MatDialogRef<EditarTareaComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.construirFormulario();
    if (this.data.accion === 'Editar') {
      this.formulario.patchValue({
        id: this.data._id,
        descripcionCorta: this.data.descripcionCorta,
        descripcionLarga: this.data.descripcionLarga
      });
    }
  }

  public accionTask() {
    if (this.data.accion === 'Crear') {
      this.guardarTask();
    }else {
      this.actualizarTask();
    }
  }

  public guardarTask(): void {
    this.formulario.patchValue({
      id: localStorage.getItem('uid')
    });
    const result = this.taskService.guardarTask(this.formulario.value).subscribe({
      next: value => {
        this.dialogRef.close({ok: true});
        
      }, error: err => {
        for (let index = 0; index < err.error.errors.length; index++) {
          Swal.fire({
            icon: 'info',
            text: err.error.errors[index].msg,
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

  public actualizarTask(): void {
    console.log(this.formulario.value);
    
    const result = this.taskService.actualizarTask(this.formulario.value).subscribe({
      next: value => {
        this.dialogRef.close({ok: true});
        
      }, error: err => {
        for (let index = 0; index < err.error.errors.length; index++) {
          Swal.fire({
            icon: 'info',
            text: err.error.errors[index].msg,
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

  private construirFormulario() {
    this.formulario = this.fb.group({
      id: [''],
      descripcionCorta: [''],
      descripcionLarga: ['']
    });
  }

}
