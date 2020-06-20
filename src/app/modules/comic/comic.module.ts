import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PriceComponent } from './components/products/price/price.component';
import { ProductsComponent } from './components/products/products.component';
import { ComicListComponent } from './components/comic-list/comic-list.component';
import { ComicDetailsComponent } from './components/comic-details/comic-details.component';
import { ProductDialogComponent } from './components/products/product-dialog/product-dialog.component';
import { ComicLeftSidebarComponent } from './components/comic-left-sidebar/comic-left-sidebar.component';
import { ProductVerticalComponent } from './components/products/product-vertical/product-vertical.component';
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

import { BrandsComponent } from './components/widgets/brands/brands.component';
import { SearchCharacterComponent } from './components/widgets/search-character/search-character.component';
import { PopularProductsComponent } from './components/widgets/popular-products/popular-products.component';
import { ProductZoomComponent } from './components/comic-details/comic-zoom/product-zoom.component';


@NgModule({
  declarations: [
    ProductsComponent,
    PriceComponent,
    ComicListComponent,
    ComicDetailsComponent,
    ProductDialogComponent,
    ComicLeftSidebarComponent,
    ProductVerticalComponent,

    BrandsComponent,
    SearchCharacterComponent,
    PopularProductsComponent,
    ProductZoomComponent
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
    ProductDialogComponent,
    ProductZoomComponent,
    MatAutocompleteModule,
    MatInputModule

  ],

  entryComponents:[
    ProductDialogComponent,
    ProductZoomComponent
  ],
})

export class ComicModule { }
