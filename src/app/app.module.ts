import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { ClienteEdicionComponent } from './pages/cliente/cliente-edicion/cliente-edicion.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ArticuloComponent } from './pages/articulo/articulo.component';
import { ArticuloEdicionComponent } from './pages/articulo/articulo-edicion/articulo-edicion.component';
import { OrdenComponent } from './pages/orden/orden.component';
import { OrdenEdicionComponent } from './pages/orden/orden-edicion/orden-edicion.component';

@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    ClienteEdicionComponent,
    ArticuloComponent,
    ArticuloEdicionComponent,
    OrdenComponent,
    OrdenEdicionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
