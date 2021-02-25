import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Articulo } from 'src/app/_model/articulo';
import { ArticuloService } from 'src/app/_service/articulo.service';

@Component({
  selector: 'app-articulo-edicion',
  templateUrl: './articulo-edicion.component.html',
  styleUrls: ['./articulo-edicion.component.css']
})
export class ArticuloEdicionComponent implements OnInit {

  form: FormGroup;
  id: number;
  edicion: boolean;

  constructor(private route: ActivatedRoute, private router: Router,private articuloService: ArticuloService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombre': new FormControl(''),
      'codigo': new FormControl(''),
      'valorUnitario': new FormControl(0),
      'stock': new FormControl(0)
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      //cargar la data del servicio en el form
      this.articuloService.obtenerPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id': new FormControl(data.idArticulo),
          'nombre': new FormControl(data.nombre),
          'codigo': new FormControl(data.codigo),
          'valorUnitario': new FormControl(data.valorUnitario),
          'stock': new FormControl(data.stock)
        });
      });
    }
  }


  registrar() {
    if(this.form.invalid){
      return;
    }

    let articulo = new Articulo();
    articulo.idArticulo = this.form.value['id'];
    articulo.nombre = this.form.value['nombre'];
    articulo.codigo = this.form.value['codigo'];
    articulo.valorUnitario = this.form.value['valorUnitario'];
    articulo.stock = this.form.value['stock'];

    if (this.edicion) {
      //servicio de edicion
      this.articuloService.modificar(articulo).subscribe(() => {
        this.articuloService.listar().subscribe(data => {
          this.articuloService.articuloCambio.next(data);
        });
      });
    } else {
      //servicio de registro
      this.articuloService.registrar(articulo).subscribe(data => {
        this.articuloService.listar().subscribe(data => {
          this.articuloService.articuloCambio.next(data);
        });
      });
    }

    this.router.navigate(['articulo']);
  }

}
