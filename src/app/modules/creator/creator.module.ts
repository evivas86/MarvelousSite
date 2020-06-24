import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreatorListComponent } from './components/creator-list/creator-list.component';
import { CreatorDetailsComponent } from './components/creator-details/creator-details.component';
import { CreatorLeftSidebarComponent } from './components/creator-left-sidebar/creator-left-sidebar.component';
import { CommonModule } from '@angular/common';
import { CreatorRoutingModule } from './creator-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonToggleModule} from '@angular/material/button-toggle'

// Import the library
import { NgxImageZoomModule } from 'ngx-image-zoom';

import { from } from 'rxjs';

import { SearchCharacterComponent } from './components/widgets/search-character/search-character.component';
import { CreatorZoomComponent } from './components/creator-details/creator-zoom/creator-zoom.component';


@NgModule({
  declarations: [
    CreatorListComponent,
    CreatorDetailsComponent,
    CreatorLeftSidebarComponent,
    CreatorZoomComponent,
    SearchCharacterComponent
  ],
  imports: [
    CommonModule,
    CreatorRoutingModule,
    SharedModule,
    SwiperModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxPaginationModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatInputModule,
    MatButtonToggleModule,
    NgxImageZoomModule.forRoot() // <-- Add this line

  ],
  exports: [
    CreatorZoomComponent,
    MatAutocompleteModule,
    MatInputModule

  ],

  entryComponents:[
    CreatorZoomComponent
  ],
})

export class CreatorModule { }
