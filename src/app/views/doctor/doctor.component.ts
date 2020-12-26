import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PatientService} from '../../services/Patient.service';
import {SharedServiceService} from '../../services/shared-service.service';
import {DoctorService} from '../../services/doctor.service';
import {HospitalBeds} from '../../dto/HospitalBeds';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  doctorId;
  hospitalId;
  hospitalName;
  isdirector: boolean;
  @Output() getCurrentUser: EventEmitter<any> = new EventEmitter();

  hospitalBed: HospitalBeds[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private sharedService: SharedServiceService, private doctorService: DoctorService, private patientService: PatientService) {
  }

  ngOnInit(): void {
    this.doctorId = localStorage.getItem( 'doctorId' );
    this.doctorService.checkIsdirector( this.doctorId ).subscribe( (resp) => {
      this.isdirector = resp.data;
    } );
    this.doctorService.getBedDetails( this.doctorId ).subscribe( (response) => {
      if (response.code !== 200) {
        alert( 'Invalid' );
      } else if (response.code === 200 && response.data != null) {
        this.hospitalId = response.data.hospitalId;
        this.hospitalName = response.data.hospitalName;

        for (let i = 0; i < (response.data.hospitalBeds).length; i++) {
          if ((response.data.hospitalBeds)[i].admitted == true) {

            this.hospitalBed.push( new HospitalBeds( (response.data.hospitalBeds)[i].bedId, (response.data.hospitalBeds)[i].patientId, 'admitted', true/*(response.data.hospitalBeds)[i].discharged*/ ) );
          } else {
            this.hospitalBed.push( new HospitalBeds( (response.data.hospitalBeds)[i].bedId, (response.data.hospitalBeds)[i].patientId, 'notAdmited ', false ) );
          }
        }
      }
    } );
    this.sharedService.sendClickEvent();
    this.sharedService.toggle( this.doctorId );


  }

  isdischarged(bed, patientId) {
    this.doctorService.checkIsdirector( this.doctorId ).subscribe( (resp) => {
      console.log( resp );
      if (resp.data === true) {

        this.patientService.update( patientId, this.doctorId, '', 'discharge' ).subscribe( (resp) => {
          if (resp.data === true) {
            this.hospitalBed.splice( this.hospitalBed.findIndex( x => x.patientId === bed.patientId ), 1 );
          }
        } );

      } else {
        alert( 'You are not a director!!!' );
      }
    } );
  }

  patientView(patientId) {
    this.router.navigate( ['/patient'], {
      queryParams: {
        patientId,
        doctorId: this.doctorId,
      }
    } );
  }


  doctorList() {
    this.router.navigate(['/doctorList'],
      {
        queryParams: {
          hospitalId: this.hospitalId,
          directorId: this.doctorId,
          hospitalName: this.hospitalName
        }
      });
  }

}


