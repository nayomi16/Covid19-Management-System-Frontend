import { Component, OnInit } from '@angular/core';
import {PatientService} from '../../services/Patient.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalCount;
  activecases;
  dischargedcount;


  constructor(private patientService: PatientService) { }

  ngOnInit(): void {

    this.patientService.getTotalCount().subscribe((resp) => {
      console.log(resp.data.discharged);
      this.activecases = resp.data.activecount;
      this.dischargedcount = resp.data.discharged;
      this.totalCount = (resp.data.activecount + resp.data.discharged);
      // console.log(this.activecases,"kkk");
    });
  }

}
