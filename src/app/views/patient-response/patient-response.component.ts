import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-patient-response',
  templateUrl: './patient-response.component.html',
  styleUrls: ['./patient-response.component.css']
})
export class PatientResponseComponent implements OnInit {

  serialNo: string;
  bedNo: number;
  hospitalName: string;
  queueNo: number;
  bedAvailablility: boolean;

  constructor(private router: Router, private route: ActivatedRoute) {

    this.route.queryParamMap.subscribe((value ) => {
      this.serialNo = value.get('serialNo');
      this.bedNo = Number(value.get('bedNo'));
      this.hospitalName = value.get('hospitalName');
      this.queueNo = Number(value.get('queueNo'));

    });

    if (this.queueNo > 0) {
      this.bedAvailablility = false;
    } else {
      this.bedAvailablility = true;
    }
  }

  ngOnInit(): void {

  }




}
