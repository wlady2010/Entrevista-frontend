import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticuloEdicionComponent } from './pages/articulo/articulo-edicion/articulo-edicion.component';
import { ArticuloComponent } from './pages/articulo/articulo.component';
import { ClienteEdicionComponent } from './pages/cliente/cliente-edicion/cliente-edicion.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { OrdenEdicionComponent } from './pages/orden/orden-edicion/orden-edicion.component';
import { OrdenComponent } from './pages/orden/orden.component';

const routes: Routes = [
  {path: 'cliente', component: ClienteComponent, children: [
    {path: 'nuevo', component: ClienteEdicionComponent}
  ]},
  {path: 'articulo', component: ArticuloComponent, children: [
    {path: 'nuevo', component: ArticuloEdicionComponent},
    {path: 'edicion/:id', component: ArticuloEdicionComponent}
  ]},
  {path: 'orden', component: OrdenComponent, children: [
    {path: 'nuevo', component: OrdenEdicionComponent}
  ]},
  {path: 'listarOrdenes', component: ClienteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
