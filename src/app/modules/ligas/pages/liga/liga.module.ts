import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LigaPageRoutingModule } from './liga-routing.module';

import { LigaPage } from './liga.page';
import {LigasModule} from '../../ligas.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LigaPageRoutingModule,
    LigasModule,
  ],
  declarations: [LigaPage]
})
export class LigaPageModule {}
