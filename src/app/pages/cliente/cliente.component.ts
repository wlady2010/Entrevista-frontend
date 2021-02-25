import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Articulo } from 'src/app/_model/articulo';
import { Cliente } from 'src/app/_model/cliente';
import { Orden } from 'src/app/_model/orden';
import { ArticuloService } from 'src/app/_service/articulo.service';
import { ClienteService } from 'src/app/_service/cliente.service';
import { OrdenService } from 'src/app/_service/orden.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  dataSource: MatTableDataSource<Cliente>;
  dataSourceOrdenes: MatTableDataSource<Orden>;
  dataSourceArticulos: MatTableDataSource<Articulo>;
  esOrden = false;
  displayedColumnsCliente: string[] = ['nombres', 'apellidos', 'acciones'];
  displayedColumnsOrden: string[] = ['idOrden', 'fecha', 'acciones'];
  displayedColumnsArticulo: string[] = ['nombre', 'codigo', 'valorUnitario'];
  constructor(private router: Router,private clienteService: ClienteService, private articuloService: ArticuloService, private ordenService: OrdenService) { }

  ngOnInit(): void {
    this.esOrden = this.router.url.includes('listarOrdenes');
    this.clienteService.clienteCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.clienteService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  listarOrdenes(idCliente) {
    this.ordenService.listarOrdenes(idCliente).subscribe(data => {
      if (data.length > 0) {
        this.dataSourceOrdenes = new MatTableDataSource(data);
      } else {
        this.dataSourceOrdenes = new MatTableDataSource([]);
        this.dataSourceArticulos = new MatTableDataSource([]);
      }
    });
  }

  listarDetalle(idOrden) {
    this.articuloService.obtenerArticulosDetalle(idOrden).subscribe(data => {
      this.dataSourceArticulos = new MatTableDataSource(data);
    })
  }

}
