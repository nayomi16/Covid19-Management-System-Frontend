import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './views/home/home.component';
import {PatientRegComponent} from './views/patient-reg/patient-reg.component';
import {PatientResponseComponent} from './views/patient-response/patient-response.component';
import {DoctorComponent} from './views/doctor/doctor.component';
import {LoginComponent} from './views/login/login.component';
import {PatientComponent} from "./views/patient/patient.component";
import {MohComponent} from "./views/moh/moh.component";


const routes: Routes = [
  {
    path : 'home', component: HomeComponent
  },
  {
    path : 'login', component : LoginComponent
  },

  {
    path : 'register', component : PatientRegComponent
  },
  {
    path : 'patient', component : PatientComponent
  },
  {
    path: 'patientResponse', component: PatientResponseComponent
  },
  {
    path: 'doctor', component: DoctorComponent
  },
  {
    path : 'moh', component : MohComponent
  },
  {
    path: '', pathMatch: 'full', redirectTo: 'home'
  },
  {
    path: '**', redirectTo: 'home'
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
