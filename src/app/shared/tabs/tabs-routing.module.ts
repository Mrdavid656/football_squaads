import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'ligas',
        loadChildren: () => import('../../modules/ligas/pages/liga/liga.module').then(m => m.LigaPageModule)
      },
      {
        path: 'equipos',
        loadChildren: () => import('../../modules/equipos/pages/equipo/equipo.module').then(m => m.EquipoPageModule)
      },
      {
        path: 'jugadores',
        loadChildren: () => import('../../modules/jugadores/pages/jugador/jugador.module').then(m => m.JugadorPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/ligas',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/ligas',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
