import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private headers: HttpHeaders;

  constructor(
    private http: HttpClient
  ) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-token': `${localStorage.getItem('token')}`
    });
  }

  guardarTask(datos: any): Observable<any> {
    return this.http.post(`${environment.urlbackend}/api/task`, datos, {
      headers: this.headers,
      withCredentials: true
    });
  }

  actualizarTask(datos: any): Observable<any> {
    return this.http.put(`${environment.urlbackend}/api/task`, datos, {
      headers: this.headers,
      withCredentials: true
    });
  }

  finalizarTask(datos: any): Observable<any> {
    return this.http.put(`${environment.urlbackend}/api/task/finalizar`, datos, {
      headers: this.headers,
      withCredentials: true
    });
  }

  obtenerTasks(): Observable<any> {
    return this.http.get(`${environment.urlbackend}/api/task`, {
      headers: this.headers,
      withCredentials: true
    });
  }

  eliminarTask(id: string): Observable<any> {
    return this.http.delete(`${environment.urlbackend}/api/task/eliminar/${id}`, {
      headers: this.headers,
      withCredentials: true
    });
  }

}
