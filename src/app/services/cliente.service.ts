import { Injectable } from '@angular/core';
import { CLIENTES } from '../components/clientes/clientes.json';
import { Cliente } from '../components/clientes/cliente';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { response } from 'express';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {

  private url: string = 'http://localhost:8081/api/clientes'

  private httpHeader = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private router: Router) { }

  getClientes(page: number): Observable<any>{

    return this.http.get<Cliente[]>(this.url + '/page/' + page).pipe(
      tap((response: any) => {
        (response.content as Cliente[]).forEach( cliente => {
          console.log('Cliente Service:' + cliente.nombre)})
      })
    );
  }

  create(cliente: Cliente): Observable<any>{

    return this.http.post<any>(this.url, cliente, {headers: this.httpHeader}).pipe(
      catchError(e => {
        if(e.status==400){
          return throwError(() => e)
        }

        console.error(e.error.mensaje);
        Swal.fire({
          title: e.error.mensaje,
          text: e.error.error,
          icon: "error"
        });
        return throwError(() => e)
      })
    );

  }

  getCliente(id: any): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.url}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        Swal.fire({
          title: "Algo ha ido mal",
          text: e.error.mensaje,
          icon: "error"
        });
        return throwError(() => e)
      })
    )
  }

  update(cliente: Cliente): Observable<any>{
    return this.http.put<any>(`${this.url}/${cliente.id}`,cliente, {headers: this.httpHeader}).pipe(
      catchError(e => {
        if(e.status==400){
          return throwError(() => e)
        }
        console.error(e.error.mensaje);
        Swal.fire({
          title: e.error.mensaje,
          text: e.error.error,
          icon: "error"
        });
        return throwError(() => e)
      })
    )
  }

  delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.url}/${id}`, {headers: this.httpHeader}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire({
          title: "Algo ha ido mal",
          text: e.error.mensaje,
          icon: "error"
        });
        return throwError(() => e.error.mensaje)
      })
    )
  }
}
