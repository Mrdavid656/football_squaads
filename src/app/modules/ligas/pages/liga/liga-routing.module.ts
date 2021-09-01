import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LigaPage } from './liga.page';

const routes: Routes = [
  {
    path: '',
    component: LigaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LigaPageRoutingModule {}
