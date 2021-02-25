import {DetalleOrden} from '../_model/detalleOrden';
import {Cliente} from '../_model/cliente';


export class Orden {
  idOrden: number;
  cliente: Cliente;
  fecha: string;
  detalleOrden: DetalleOrden[];
}
