import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'comic',
    loadChildren: () => import('./modules/comic/comic.module').then(m => m.ComicModule)
  },
  {
    path: 'character',
    loadChildren: () => import('./modules/character/character.module').then(m => m.CharacterModule)
  },
  {
    path: 'creator',
    loadChildren: () => import('./modules/creator/creator.module').then(m => m.CreatorModule)
  },
  {
    path: 'serie',
    loadChildren: () => import('./modules/serie/serie.module').then(m => m.SerieModule)
  },

  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'disabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
