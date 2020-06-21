import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharacterDetailsComponent } from './components/character-details/character-details.component';
import { CharacterLeftSidebarComponent } from './components/character-left-sidebar/character-left-sidebar.component';



// Routes
const routes: Routes = [

  { path: '', component: CharacterLeftSidebarComponent },
  { path: ':id', component: CharacterDetailsComponent }


];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharacterRoutingModule { }
