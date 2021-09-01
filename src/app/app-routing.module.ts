import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./shared/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'jugador',
    loadChildren: () => import('./modules/jugadores/pages/jugador/jugador.module').then( m => m.JugadorPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
