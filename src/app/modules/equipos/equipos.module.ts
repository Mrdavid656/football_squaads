import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListaComponent} from './components/lista/lista.component';
import {IonicModule} from '@ionic/angular';
import {FormularioComponent} from './components/formulario/formulario.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DetalleEquipoComponent} from './components/detalle/detalle.component';



@NgModule({
  declarations: [
    ListaComponent,
    FormularioComponent,
    DetalleEquipoComponent,
  ],
  exports: [
    ListaComponent,
    FormularioComponent,
    DetalleEquipoComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EquiposModule { }
