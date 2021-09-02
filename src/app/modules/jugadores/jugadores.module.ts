import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListaComponent} from './components/lista/lista.component';
import {IonicModule} from '@ionic/angular';
import {FormularioComponent} from './components/formulario/formulario.component';
import {ReactiveFormsModule} from '@angular/forms';


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
    ReactiveFormsModule
  ]
})
export class JugadoresModule { }
