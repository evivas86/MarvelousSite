import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SerieListComponent } from './components/serie-list/serie-list.component';
import { SerieLeftSidebarComponent } from './components/serie-left-sidebar/serie-left-sidebar.component';
import { CommonModule } from '@angular/common';
import { SerieRoutingModule } from './serie-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

// Import the library
import { NgxImageZoomModule } from 'ngx-image-zoom';

import { CharacterFilterComponent } from './components/widgets/character-filter/character-filter.component';
import { TypeFilterComponent } from './components/widgets/type-filter/type-filter.component';
import { YearFilterComponent } from './components/widgets/year-filter/year-filter.component';
import { RatingFilterComponent } from './components/widgets/rating-filter/rating-filter.component';
import {MultiDatepickerModule} from './components/widgets/year-filter/datepicker/multidatepicker.module';


@NgModule({
  declarations: [
    SerieListComponent,
    SerieLeftSidebarComponent,
    CharacterFilterComponent,
    TypeFilterComponent,
    YearFilterComponent,
    RatingFilterComponent
  ],
  imports: [
    CommonModule,
    SerieRoutingModule,
    SharedModule,
    SwiperModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxPaginationModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MultiDatepickerModule,
    NgxImageZoomModule.forRoot() // <-- Add this line

  ],
  exports: [
    MatAutocompleteModule,
    MatInputModule

  ],
  providers: [  
    MatDatepickerModule,
    MatNativeDateModule  
  ],
  entryComponents:[
  ],
})

export class SerieModule { }
