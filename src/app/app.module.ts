import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxImgZoomModule } from 'ngx-img-zoom';




import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './modules/shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    NgxSpinnerModule,
    BrowserModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxImgZoomModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
