import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ResponseDto} from '../dto/ResponseDto';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }
  url = 'http://localhost:8080/api/v1/doctor';

  getBedDetails(doctorId): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.url + '/id?doctorId=' + doctorId );
  }


  checkIsdirector(doctorId): Observable<ResponseDto> {
    return this.http.get<ResponseDto>( this.url + '/check?doctorId=' + doctorId );
  }

  updateDoctor(hospitalId, doctorId): Observable<ResponseDto> {
    return this.http.options<ResponseDto>( this.url + '?doctorId=' + doctorId + '&hospitalId=' + hospitalId );
  }

  getDoctorList(hospitalId): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.url + '/hospitalDetails?hospitalId=' + hospitalId);
  }

  getAllDoctorList(): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.url + '/allDoctors');
  }

  addNewDoctor(doctor): Observable<ResponseDto> {
    return this.http.post<ResponseDto>(this.url + '/', doctor);
  }
}

