import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Orden } from '../../_model/orden';
import { OrdenService } from '../../_service/orden.service';

@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.css']
})
export class OrdenComponent implements OnInit {

  dataSource: MatTableDataSource<Orden>;
  displayedColumnsOrden: string[] = ['idOrden', 'fecha'];
  id: number;
  constructor(private ordenService: OrdenService) { }

  ngOnInit(): void {
    this.ordenService.ordenCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.ordenService.ordenCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.ordenService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

}
