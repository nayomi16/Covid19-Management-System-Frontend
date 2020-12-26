import { Component, OnInit } from '@angular/core';

import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {PatientService} from '../../services/Patient.service';
import {DoctorService} from '../../services/doctor.service';
import {MohService} from '../../services/moh.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  name;
  patientId;
  age;
  district;
  contactNo;
  admit_date;
  admitted_by;
  visible;
  doctorId;
  sLevel;
  hospital;
  bedId;
  qnumber;

  queueVisible: boolean;
  noSet: boolean;

  form = new FormGroup( {
    slevel: new FormControl( '', [Validators.required] ),
  } );

  constructor(private route: ActivatedRoute, private patientService: PatientService, private doctorService: DoctorService, private mohService: MohService) {
    this.route.queryParamMap.subscribe( (value) => {
      this.patientId = value.get( 'patientId' );
      this.doctorId = value.get( 'doctorId' );
    } );
  }


  ngOnInit(): void {
    this.patientService.patientGet( this.patientId ).subscribe( (resp) => {
      console.log( resp.data );
      this.age = resp.data.age;
      this.district = resp.data.district;
      this.contactNo = resp.data.contactNo;
      this.qnumber = resp.data.queueNo;
      if (this.doctorId === 'moh') {
        this.noSet = false;
        this.visible = false;
        this.queueVisible = false;
      } else if (this.doctorId != null && resp.data.admitDate != null) {
        this.admit_date = resp.data.admitDate;
        this.admitted_by = resp.data.admittedBy;
        this.hospital = resp.data.hospitalId;
        this.bedId = resp.data.bedId;
        this.sLevel = resp.data.severityLevel;
        this.visible = false;
        this.queueVisible = false;
        this.noSet = true;

      } else if (this.doctorId != null && resp.data.admitDate == null) {
        this.admit_date = 'no';
        this.admitted_by = 'no';
        this.sLevel = 'no';
        this.hospital = resp.data.hospitalId;
        this.bedId = resp.data.bedId;
        this.visible = true;
        this.queueVisible = false;
        this.noSet = true;

      } else if (this.doctorId !== 'moh' && this.doctorId == null) {
        this.visible = false;
        if (resp.data.admittedBy == null && resp.data.bedId !== 0) {
          this.hospital = resp.data.hospitalId;
          this.bedId = resp.data.bedId;
          this.admit_date = 'no';
          this.admitted_by = 'no';
          this.sLevel = 'no';
          this.queueVisible = false;
          this.noSet = true;
        } else if (resp.data.admittedBy == null && resp.data.bedId == 0) {
          this.noSet = false;
          this.queueVisible = true;
        } else {
          this.admit_date = resp.data.admitDate;
          this.admitted_by = resp.data.admittedBy;
          this.hospital = resp.data.hospitalId;
          this.bedId = resp.data.bedId;
          this.sLevel = resp.data.severityLevel;
          this.queueVisible = false;
          this.noSet = true;
        }

      }

    } );
  }

  get slevel() {
    return this.form.get( 'slevel' );
  }

  admit() {
    console.log(this.patientId );
    this.patientService.update( this.patientId, this.doctorId, this.form.get( 'slevel' ).value, 'admit' ).subscribe( (resp) => {
      console.log( resp );

      if (resp.data === true) {
        this.ngOnInit();
      }
    } );

  }


}

