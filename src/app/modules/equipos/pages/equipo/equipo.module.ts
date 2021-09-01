import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EquipoPageRoutingModule } from './equipo-routing.module';

import { EquipoPage } from './equipo.page';
import {EquiposModule} from "../../equipos.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        EquipoPageRoutingModule,
        EquiposModule
    ],
  declarations: [EquipoPage]
})
export class EquipoPageModule {}
