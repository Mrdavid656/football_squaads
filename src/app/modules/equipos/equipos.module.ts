import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListaComponent} from './components/lista/lista.component';
import {IonicModule} from '@ionic/angular';
import {FormularioComponent} from './components/formulario/formulario.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    ListaComponent,
    FormularioComponent
  ],
  exports: [
    ListaComponent,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EquiposModule { }
