import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SymptomsComponent } from './symptoms/symptoms.component';
import { MainComponent } from './main/main.component';
import {NgxSpinnerModule} from "ngx-spinner";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { StatsComponent } from './stats/stats.component';

@NgModule({
  declarations: [
    AppComponent,
    SymptomsComponent,
    MainComponent,
    StatsComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
