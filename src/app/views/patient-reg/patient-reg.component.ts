import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PatientService} from '../../services/Patient.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-patient-reg',
  templateUrl: './patient-reg.component.html',
  styleUrls: ['./patient-reg.component.css']
})
export class PatientRegComponent implements OnInit {
  serialNo: string;
  bedNo: number;
  hospitalName: string;
  queueNo: number;
  bedAvailablility: boolean;

  constructor(private patientService: PatientService, private router: Router) { }

  get firstName() {
    return this.form.get('firstName');
  }
  get lastName() {
    return this.form.get('lastName');
  }
  get age() {
    return this.form.get('age');
  }
  get gender() {
    return this.form.get('gender');
  }
  get district() {
    return this.form.get('district');
  }
  get contactNo() {
    return this.form.get('contactNo');
  }
  get email() {
    return this.form.get('email');
  }
  get locationX() {
    return this.form.get('locationX');
  }
  get locationY() {
    return this.form.get('locationY');
  }
  form = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}')]),
    gender: new FormControl('', [Validators.required]),
    district: new FormControl('', [Validators.required]),
    contactNo: new FormControl('', [Validators.required , Validators.pattern('[0-9]{10}')]),
    email: new FormControl(),
    locationX: new FormControl('', [Validators.required, Validators.pattern('[0-9]{2,3}')]),
    locationY: new FormControl('', [Validators.required, Validators.pattern('[0-9]{2,3}')])

  });
patientResponse;
  ngOnInit(): void {
  }

  register() {
    if (this.form.valid) {
      this.patientService.register(this.form.value).subscribe((response) => {
        if (response.data == null) {
          alert( 'Invalid location coordinates' );
          console.log('Invalid location coordinates');

        } else if (response.code === 200 && response.data != null ) {
          this.serialNo = response.data.serialNo;
          this.bedNo = response.data.bedNo;
          this.hospitalName = response.data.hospitalName;
          this.queueNo = response.data.queueNo;
          alert('patient is added!!');
          this.router.navigate( ['/patientResponse'], {
            queryParams : {
              serialNo: response.data.serialNo,
              bedNo: response.data.bedNo,
              hospitalName: response.data.hospitalName,
              queueNo: response.data.queueNo
            }
          });

        }
      }, (error) => {
        alert('Invalid Registration');
      } );
      this.form.reset();
    } else {
      alert('Fill required input fields');
    }
  }

  registered() {
    this.router.navigate( ['/patientResponse'], {
      queryParams : {
        serialNo: this.serialNo,
        bedNo: this.bedNo,
        hospitalName: this.hospitalName,
        queueNo: this.queueNo
      }
    });
  }
}

