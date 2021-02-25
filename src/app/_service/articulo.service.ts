import { Injectable } from '@angular/core';
import { Articulo } from '../_model/articulo';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  articuloCambio = new Subject<Articulo[]>();
  url: string = `${environment.HOST}/articulos`;
  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Articulo[]>(this.url);
  }

  obtenerPorId(idArticulo: number) {
    return this.http.get<Articulo>(`${this.url}/${idArticulo}`);
  }

  registrar (articulo: Articulo){
    return this.http.post(this.url, articulo);
  }

  modificar(articulo: Articulo) {
    return this.http.put(this.url, articulo);
  }

  eliminar(idArticulo: number) {
    return this.http.delete(`${this.url}/articuloOrden/${idArticulo}`);
  }

  obtenerArticulosDetalle (idOrden: number) {
    return this.http.get<Articulo[]>(`${this.url}/obtenerDetalle/${idOrden}`);
  }
}
