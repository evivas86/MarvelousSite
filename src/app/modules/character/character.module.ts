import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { CharacterDetailsComponent } from './components/character-details/character-details.component';
import { CharacterLeftSidebarComponent } from './components/character-left-sidebar/character-left-sidebar.component';
import { CommonModule } from '@angular/common';
import { CharacterRoutingModule } from './character-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

// Import the library
import { NgxImageZoomModule } from 'ngx-image-zoom';

import { from } from 'rxjs';

import { SearchCharacterComponent } from './components/widgets/search-character/search-character.component';
import { CharacterZoomComponent } from './components/character-details/character-zoom/character-zoom.component';


@NgModule({
  declarations: [
    CharacterListComponent,
    CharacterDetailsComponent,
    CharacterLeftSidebarComponent,

    SearchCharacterComponent,
    CharacterZoomComponent
  ],
  imports: [
    CommonModule,
    CharacterRoutingModule,
    SharedModule,
    SwiperModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxPaginationModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatInputModule,
    NgxImageZoomModule.forRoot() // <-- Add this line

  ],
  exports: [
    CharacterZoomComponent,
    MatAutocompleteModule,
    MatInputModule

  ],

  entryComponents:[
    CharacterZoomComponent
  ],
})

export class CharacterModule { }
