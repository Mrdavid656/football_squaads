import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JugadorPage } from './jugador.page';

const routes: Routes = [
  {
    path: '',
    component: JugadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JugadorPageRoutingModule {}
