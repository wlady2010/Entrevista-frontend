import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Articulo } from 'src/app/_model/articulo';
import { Cliente } from 'src/app/_model/cliente';
import { Orden } from 'src/app/_model/orden';
import { ArticuloService } from 'src/app/_service/articulo.service';
import { ClienteService } from 'src/app/_service/cliente.service';
import { OrdenService } from 'src/app/_service/orden.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DetalleOrden } from 'src/app/_model/detalleOrden';
import * as moment from 'moment';

@Component({
  selector: 'app-orden-edicion',
  templateUrl: './orden-edicion.component.html',
  styleUrls: ['./orden-edicion.component.css']
})
export class OrdenEdicionComponent implements OnInit {

  clientes: Cliente[] = [];
  articulos: Articulo[] = [];

  mensaje: string;

  clienteSeleccionado: Cliente;
  articuloSeleccionado: Articulo;


  idClienteSeleccionado: number;
  idArticuloSeleccionado: number;

  fechaSeleccionada: Date = new Date();

  articulosSeleccionados: Articulo[] = [];


  filteredOptionsCliente: Observable<any[]>;

  constructor(private ordenService: OrdenService, private clienteService: ClienteService, private articuloService: ArticuloService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.listarClientes();
    this.listarArticulos();
  }

  agregarArticulo() {
    if (this.idArticuloSeleccionado > 0) {

      let cont = 0;
      for (let i = 0; i < this.articulosSeleccionados.length; i++) {
        let articulo = this.articulosSeleccionados[i];
        if (articulo.idArticulo === this.idArticuloSeleccionado) {
          cont++;
          break;
        }
      }

      if (cont > 0) {
        this.mensaje = 'El articulo se encuentra en la lista';
        this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
      } else {
        let articulo = new Articulo();
        articulo.idArticulo = this.idArticuloSeleccionado;

        this.articuloService.obtenerPorId(this.idArticuloSeleccionado).subscribe(data => {
          articulo.nombre = data.nombre;
          articulo.codigo = data.codigo;
          articulo.valorUnitario = data.valorUnitario;
          articulo.cantidad = 0;
          articulo.stock = data.stock;
          if (data.stock > 0) {
            this.articulosSeleccionados.push(articulo);
          } else {
            this.mensaje = 'No se puede agregar el articulo stock en 0';
            this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
          }
        });
      }
    } else {
      this.mensaje = 'Debe agregar un articulo';
      this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
    }
  }

  diferenciaStock(articulo: Articulo){
    this.articulosSeleccionados.forEach((art) => {
      if (art.idArticulo == articulo.idArticulo) {
        art.cantidad = articulo.cantidad;
      }
    });

  }

  removerArticulo(index: number) {
    this.articulosSeleccionados.splice(index, 1);
  }

  estadoBotonRegistrar(){}

  aceptar(){
    let cliente = new Cliente();
    cliente.idCliente = this.idClienteSeleccionado;
    let tieneStock = true;
    let orden = new Orden();
    orden.cliente = cliente
    orden.fecha = moment(this.fechaSeleccionada).toISOString();
    let detalleOrden = [];
    debugger;
    this.articulosSeleccionados.forEach(articulo => {
      let detalle = new DetalleOrden();
      detalle.articulo = articulo;
      if (articulo.stock < articulo.cantidad) {
        tieneStock = false;
      } else {
        detalle.articulo.stock = articulo.stock - articulo.cantidad;
        detalleOrden.push(detalle);
      }
    });

    orden.detalleOrden = detalleOrden;
    if (tieneStock) {
      this.ordenService.registrar(orden).subscribe(() => {
        this.snackBar.open("Se registró", "Aviso", { duration: 2000 });
        this.ordenService.listar().subscribe(data => {
          this.ordenService.ordenCambio.next(data);
        });
        setTimeout(() => {
          this.limpiarControles();
        }, 1000);
      });
    } else {
      detalleOrden = [];
      this.snackBar.open("El cantidad del stock de uno de los articulos es mayor a la disponible", "Aviso", { duration: 2000 });
    }


  }

  limpiarControles() {
    this.articulosSeleccionados = [];
    this.idClienteSeleccionado = 0;
    this.fechaSeleccionada = new Date();
    this.fechaSeleccionada.setHours(0);
    this.fechaSeleccionada.setMinutes(0);
    this.fechaSeleccionada.setSeconds(0);
    this.fechaSeleccionada.setMilliseconds(0);
    this.mensaje = '';
  }

  listarClientes() {
    this.clienteService.listar().subscribe(data => {
      this.clientes = data;
    });
  }

  listarArticulos() {
    this.articuloService.listar().subscribe(data => {
      this.articulos = data;
    });
  }

  seleccionarCliente(e: any) {
    this.clienteSeleccionado = e.option.value;
  }

  seleccionarArticulo(e: any) {
    this.articuloSeleccionado = e.option.value;
  }

}
