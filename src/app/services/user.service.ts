import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private headers: HttpHeaders;

  constructor(
    private http: HttpClient
  ) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  registrarUsuario(datos: any): Observable<any> {
    return this.http.post(`${environment.urlbackend}/api/usuarios`, datos, {
      headers: this.headers,
      withCredentials: true
    });
  }

  iniciarSesion(datos: any): Observable<any> {
    return this.http.post(`${environment.urlbackend}/api/auth/login`, datos, {
      headers: this.headers,
      withCredentials: true
    });
  }
  
}
