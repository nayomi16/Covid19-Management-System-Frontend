import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { HeaderComponent } from './views/header/header.component';
import { FooterComponent } from './views/footer/footer.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {PatientRegComponent} from './views/patient-reg/patient-reg.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PatientResponseComponent } from './views/patient-response/patient-response.component';
import { DoctorComponent } from './views/doctor/doctor.component';
import { LoginComponent } from './views/login/login.component';
import { PatientComponent } from './views/patient/patient.component';
import { MohComponent } from './views/moh/moh.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    PatientRegComponent,
    PatientResponseComponent,
    DoctorComponent,
    LoginComponent,
    PatientComponent,
    MohComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
