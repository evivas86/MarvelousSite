import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComicDetailsComponent } from './components/comic-details/comic-details.component';
import { ComicLeftSidebarComponent } from './components/comic-left-sidebar/comic-left-sidebar.component';



// Routes
const routes: Routes = [

  { path: '', component: ComicLeftSidebarComponent },
  { path: ':id', component: ComicDetailsComponent }


];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComicRoutingModule { }
