import { Component, OnInit } from '@angular/core';
import {SharedServiceService} from '../../services/shared-service.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DoctorService} from '../../services/doctor.service';
import {MohService} from '../../services/moh.service';
import {PatientService} from '../../services/Patient.service';

import {Hospital} from '../../dto/hospital';
import {Patient} from '../../dto/patient';
import {Doctor} from '../../dto/doctor';
import {DistrictCount} from '../../dto/district-count';
import {Queue} from '../../dto/queue';


@Component({
  selector: 'app-moh',
  templateUrl: './moh.component.html',
  styleUrls: ['./moh.component.css']
})
export class MohComponent implements OnInit {

  queue: Queue[] = [];
  hospitalDetails: Hospital[] = [];
  patientlist: Patient[] = [];
  alldoctorList: Doctor[] = [];
  visibleButton = false;

  queueState = false;
  hospitalState = true;
  doctorState = false;
  patientState = false;
  doctorAddState = false;

  form = new FormGroup( {
    user_name: new FormControl( '', [Validators.required] ),
    name: new FormControl( '', [Validators.required] ),
    hospital_id: new FormControl( '', [Validators.required] ),
    email: new FormControl( '', [Validators.required] ),
    isDirector: new FormControl( '', [Validators.required])


  } );

  districtHospitalcount: DistrictCount[] = [new DistrictCount( 'District_A', 0 ),
    new DistrictCount( 'District_B', 0 ),
    new DistrictCount( 'District_C', 0 ),
    new DistrictCount( 'District_D', 0 ),
    new DistrictCount( 'District_E', 0 )];

  constructor(private docService: DoctorService, private mohService: MohService, private router: Router , private patientService: PatientService, private sharedService: SharedServiceService) {
    this.sharedService.sendClickEvent();
  }

  ngOnInit(): void {
    this.mohService.getAllHospitals().subscribe((resp) => {
      this.hospitalDetails = resp.data;
      console.log(this.hospitalDetails);
      this.sharedService.toggle('MoH');
    });

    this.mohService.getQueue().subscribe((resp) => {
      this.queue = resp.data;
      if (this.queue.length > 3) {
        this.visibleButton = true;
      }
    });

  }


  get user_name() {
    return this.form.get( 'user_name' );
  }

  get name() {
    return this.form.get( 'name' );
  }

  get hospital_id() {
    return this.form.get( 'hospital_id' );
  }

  get email() {
    return this.form.get( 'email' );
  }

  get isDirector() {
    return this.form.get( 'isDirector' );
  }

  hospitalAdd() {
    this.router.navigate(['/addhospital']);
  }

  viewPatient(patientId) {
    this.router.navigate( ['/patient'], {
      queryParams: {patientId, doctorId: 'moh'}
    });
  }

  /*patientList(){
    this.router.navigate(['/patientList'])
  }*/

  doctorList() {
    this.docService.getAllDoctorList().subscribe((resp) => {
      this.alldoctorList = resp.data;
      console.log(this.alldoctorList,"lll");
    });

    this.doctorState = true;
    this.queueState = false;
    this.hospitalState = false;
    this.patientState = false;
    this.doctorAddState = false;
  }
  queueDetails() {
    this.doctorState = false;
    this.queueState = true;
    this.hospitalState = false;
    this.patientState = false;
    this.doctorAddState = false;
  }

  hospitalList() {
    this.doctorState = false;
    this.queueState = false;
    this.hospitalState = true;
    this.patientState = false;
    this.doctorAddState = false;
  }

  patientList() {

    this.patientService.patientGetAll().subscribe((resp) => {
      this.patientlist = resp.data;
      console.log(resp.data);
    });
    this.doctorState = false;
    this.queueState = false;
    this.hospitalState = false;
    this.patientState = true;
    this.doctorAddState = false;
  }

  addDoctor() {
    this.doctorAddState = true;
    this.doctorState = false;
    this.queueState = false;
    this.hospitalState = false;
    this.patientState = false;
  }

  saveDoctor() {
    if (this.form.valid) {
      console.log(this.form.value, 'kkkk');
      this.docService.addNewDoctor(this.form.value).subscribe((resp) => {
        console.log(resp.data, 'jjjjj');
        if (resp.data === true) {
          alert('Doctor is added successfully');
        } else {
          alert('Invalid Details');
        }
      });
      this.form.reset();
    } else {
      alert('Fill all the input fields');
    }
  }
}
