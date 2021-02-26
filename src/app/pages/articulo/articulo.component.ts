import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Articulo } from 'src/app/_model/articulo';
import { ArticuloService } from 'src/app/_service/articulo.service';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent implements OnInit {

  dataSource: MatTableDataSource<Articulo>;
  displayedColumnsArticulo: string[] = ['idArticulo', 'nombre', 'codigo', 'valorUnitario', 'acciones'];
  constructor(private articuloService: ArticuloService) { }

  ngOnInit(): void {
    this.articuloService.articuloCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.articuloService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(idArticulo: number) {
    this.articuloService.eliminar(idArticulo).subscribe(() => {
      this.articuloService.listar().subscribe(data => {
        this.articuloService.articuloCambio.next(data);
      });
    });
  }
}
