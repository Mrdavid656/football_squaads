import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaComponent } from './components/lista/lista.component';
import {IonicModule} from '@ionic/angular';
import { DetalleComponent } from './components/detalle/detalle.component';

@NgModule({
  declarations: [
    ListaComponent,
    DetalleComponent
  ],
  exports: [
    ListaComponent,
    DetalleComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
  ]
})
export class LigasModule { }
