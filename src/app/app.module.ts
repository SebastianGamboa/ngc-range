import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgcRangeComponent } from './ngc-range/ngc-range.component';
import { RangeService } from './ngc-range/range.service';
import { Exercise1Component } from './exercise1/exercise1.component';
import { Exercise2Component } from './exercise2/exercise2.component';

@NgModule({
  declarations: [
    AppComponent,
    NgcRangeComponent,
    Exercise1Component,
    Exercise2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [RangeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
