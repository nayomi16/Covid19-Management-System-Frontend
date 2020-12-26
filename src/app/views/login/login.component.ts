import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {ROLE, TOKEN_KEY, USER_DTO} from '../constant/constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logAdmin = false;
  logPatient = false;
  logButtons = true;
  form = new FormGroup({
    userId: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  form2 = new FormGroup({
    pid: new FormControl('', [Validators.required]),

  });
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  get userId() {
    return this.form.get('userId');
  }

  get passWord() {
    return this.form.get('password');
  }

  get pid() {
    return this.form2.get('pid');
  }

  loginAdmin1() {
    this.logAdmin = true;
    this.logPatient = false;
    this.logButtons = false;
  }

  loginPatient1() {
    this.logPatient = true;
    this.logAdmin = false;
    this.logButtons = false;
  }

  loginAdmin2() {
    if (this.form.valid ) {
      this.authService.login(this.form.value).subscribe((response) => {
        if (response.code === 401) {
          alert('Invalid Username And Password.. Try again!!');
          console.log(response.code);
        } else if (response.code === 200) {
          // store user and token in the browser
          localStorage.setItem( TOKEN_KEY, response.message );
          localStorage.setItem( USER_DTO, JSON.stringify( response.data ) );
          localStorage.setItem( ROLE, response.data.role );

          // navigate to views
          if (response.data.role === 'doctor') {
            localStorage.setItem( 'doctorId', this.userId.value );
            this.router.navigate( ['/doctor'], {
              queryParams: {doctorId: this.userId.value}
            } );
          } else if (response.data.role === 'moh') {
            this.router.navigate( ['/moh'] );
          }
        }

      },  (error) => (
        alert('Invalid Username And Password.. Try again!!')));
    } else {
      alert('Fill required input fields');
    }

  }

  loginPatient2() {
    if (this.form2.valid) {
      this.router.navigate( ['/patient'], {
        queryParams: {patientId: this.pid.value, doctorId: null}
      } );
    } else {
      alert('Fill required input fields');
    }

  }

}
