import { Injectable } from '@angular/core';
import { Orden } from '../_model/orden';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {


  ordenCambio = new Subject<Orden[]>();
  url: string = `${environment.HOST}/ordenes`;
  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Orden[]>(this.url);
  }

  registrar (cliente: Orden){
    return this.http.post(this.url, cliente);
  }

  listarOrdenes(idCliente: number) {
    return this.http.get<Orden[]>(`${this.url}/listarOrdenes/${idCliente}`);
  }
}
