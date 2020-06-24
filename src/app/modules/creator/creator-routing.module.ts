import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatorDetailsComponent } from './components/creator-details/creator-details.component';
import { CreatorLeftSidebarComponent } from './components/creator-left-sidebar/creator-left-sidebar.component';



// Routes
const routes: Routes = [

  { path: '', component: CreatorLeftSidebarComponent },
  { path: ':id', component: CreatorDetailsComponent }


];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatorRoutingModule { }
