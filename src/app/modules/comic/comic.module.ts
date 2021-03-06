import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComicListComponent } from './components/comic-list/comic-list.component';
import { ComicDetailsComponent } from './components/comic-details/comic-details.component';
import { ComicLeftSidebarComponent } from './components/comic-left-sidebar/comic-left-sidebar.component';
import { CommonModule } from '@angular/common';
import { ComicRoutingModule } from './comic-routing.module';
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
import { ComicZoomComponent } from './components/comic-details/comic-zoom/comic-zoom.component';


@NgModule({
  declarations: [
    ComicListComponent,
    ComicDetailsComponent,
    ComicLeftSidebarComponent,

    SearchCharacterComponent,
    ComicZoomComponent
  ],
  imports: [
    CommonModule,
    ComicRoutingModule,
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
    ComicZoomComponent,
    MatAutocompleteModule,
    MatInputModule

  ],

  entryComponents:[
    ComicZoomComponent
  ],
})

export class ComicModule { }
