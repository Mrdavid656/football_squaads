import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JugadorPageRoutingModule } from './jugador-routing.module';

import { JugadorPage } from './jugador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JugadorPageRoutingModule
  ],
  declarations: [JugadorPage]
})
export class JugadorPageModule {}
