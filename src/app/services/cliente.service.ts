import { Injectable } from '@angular/core';
import { CLIENTES } from '../components/clientes/clientes.json';
import { Cliente } from '../components/clientes/cliente';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {

  private url: string = 'http://localhost:8081/api/clientes'

  private httpHeader = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]>{

    return this.http.get<Cliente[]>(this.url);
  }

  create(cliente: Cliente): Observable<Cliente>{

    return this.http.post<Cliente>(this.url, cliente, {headers: this.httpHeader});

  }

  getCliente(id: any): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.url}/${id}`);
  }

  update(cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${this.url}/${cliente.id}`,cliente, {headers: this.httpHeader})
  }

  delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.url}/${id}`, {headers: this.httpHeader})
  }
}
