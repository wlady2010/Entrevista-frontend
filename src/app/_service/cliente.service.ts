import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../_model/cliente';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  clienteCambio = new Subject<Cliente[]>();
  url: string = `${environment.HOST}/clientes`;
  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Cliente[]>(this.url);
  }

  registrar (cliente: Cliente){
    return this.http.post(this.url, cliente);
  }
}
