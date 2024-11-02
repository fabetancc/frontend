import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
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
import moment from 'moment';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faExclamation, faCheck, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { EditarTareaComponent } from '../../components/editar-tarea/editar-tarea.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    FontAwesomeModule
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
  public faCheck = faCheck;
  public faExclamation = faExclamation;
  public faPencil = faPencil;
  public faTrash = faTrash;
  displayedColumns: string[] = ['descripcionCorta', 'fechaCreacion', 'estado', 'ver'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  readonly dialog = inject(MatDialog);

  constructor(
    private taskService: TaskService
  ) {  }

  ngOnInit(): void {
    this.obtenerTasks();
  }

  private obtenerTasks() {
    const result = this.taskService.obtenerTasks().subscribe({
      next: value => {
        for (let index = 0; index < value.tasks.length; index++) {
          value.tasks[index].fechaCreacion = moment(Number(value.tasks[index].fechaCreacion)).format('DD/MM/YYYY');
        }
        this.dataSource = new MatTableDataSource(value.tasks);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: err => {

      },
      complete: () => {
        result.unsubscribe();
      }
    });
  }

  public finalizarTask(id: string, estado: boolean): void {

    if (estado) {
      return;
    }

    const datos = {
      id,
      estado: true
    };
    Swal.fire({
      icon: 'warning',
      text: '¿Desea finalizar esta tarea?',
      showCancelButton: true,
      confirmButtonText: 'Sí, finalizar',
      cancelButtonText: 'No'
    }).then(value => {
      if (value.isConfirmed) {
        const result = this.taskService.finalizarTask(datos).subscribe({
          next: value => {
            this.obtenerTasks();
          },
          error: err => {

          },
          complete: () => {
            result.unsubscribe();
          }
        });
      }
    });
  }

  public eliminarTask(id: string) {

    Swal.fire({
      icon: 'warning',
      text: '¿Desea eliminar esta tarea?',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No'
    }).then(value => {
      if (value.isConfirmed) {
        const result = this.taskService.eliminarTask(id).subscribe({
          next: value => {
            this.obtenerTasks();
          },
          error: err => {
    
          },
          complete: () => {
            result.unsubscribe();
          }
        });
      }
    });
    
  }

  openDialog(accion: string, data?: any): void {
    data = {
      ...data,
      accion
    }
    const dialogRef = this.dialog.open(EditarTareaComponent, {
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result.ok) {
        this.obtenerTasks();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
