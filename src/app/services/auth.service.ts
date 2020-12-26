import { Injectable } from '@angular/core';
import {ROLE, TOKEN_KEY, USER_DTO} from '../views/constant/constant';
import {ResponseDto} from '../dto/ResponseDto';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) { }

  url = 'http://localhost:8080/api/v1/auth/login';
  // url = "http://ec2-52-73-113-153.compute-1.amazonaws.com:8080/NCMS_Project-1.0.0/api/v1/auth/login"

  login(user): Observable<ResponseDto > {
    return this.http.post<ResponseDto >(this.url, user);
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_DTO);
    localStorage.removeItem(ROLE);
    localStorage.removeItem('doctorId');

    this.router.navigate(['/login']);
  }

  getUser() {
    try {
      const user = localStorage.getItem(USER_DTO);
      return JSON.parse(user);
    } catch (e) {
      this.logout();
    }
  }
}
