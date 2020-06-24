import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SerieLeftSidebarComponent } from './components/serie-left-sidebar/serie-left-sidebar.component';



// Routes
const routes: Routes = [

  { path: '', component: SerieLeftSidebarComponent },


];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SerieRoutingModule { }
