import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SymptomsComponent } from './symptoms/symptoms.component';
import { MainComponent } from './main/main.component';
import {NgxSpinnerModule} from "ngx-spinner";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { StatsComponent } from './stats/stats.component';
import { ChartsComponent } from './charts/charts.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from "@angular/forms";
@NgModule({
  declarations: [
    AppComponent,
    SymptomsComponent,
    MainComponent,
    StatsComponent,
    ChartsComponent,
    ContactComponent,
    LoginComponent,
    RegistrationComponent,
  ],
    imports: [
        HttpClientModule,
        BrowserAnimationsModule,
        BrowserModule,
        NgxSpinnerModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
