import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/_model/cliente';
import { ClienteService } from 'src/app/_service/cliente.service';

@Component({
  selector: 'app-cliente-edicion',
  templateUrl: './cliente-edicion.component.html',
  styleUrls: ['./cliente-edicion.component.css']
})
export class ClienteEdicionComponent implements OnInit {

  form: FormGroup;

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombres': new FormControl(''),
      'apellidos': new FormControl('')
    });
  }

  registrar(){
    let cliente = new Cliente();
    cliente.idCliente = this.form.value['id'];
    cliente.nombres = this.form.value['nombres'];
    cliente.apellidos = this.form.value['apellidos'];

    this.clienteService.registrar(cliente).subscribe(data=>{
      this.clienteService.listar().subscribe(data =>{
        this.clienteService.clienteCambio.next(data);
      });
    });
  }
}
