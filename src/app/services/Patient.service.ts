import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ResponseDto} from '../dto/ResponseDto';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  url = 'http://localhost:8080/api/v1/patient';

  constructor(private http: HttpClient) { }


  getTotalCount(): Observable<ResponseDto> {
    return this.http.get<ResponseDto>( this.url + '/totalcount' );
  }

  register(patient): Observable<ResponseDto> {
    return this.http.post<ResponseDto>( this.url + '/register', patient );
  }

  update(patientId, doctorId, slevel, doctorRole): Observable<ResponseDto> {
    return this.http.options<ResponseDto>( this.url + '?patientId=' + patientId + '&doctorId=' + doctorId + '&doctorRole=' + doctorRole + '&slevel=' + slevel );

  }

  patientGet(patientId): Observable<ResponseDto> {
    return this.http.get<ResponseDto>( this.url + '/id?patientId=' + patientId );
  }

  patientGetAll(): Observable<ResponseDto> {
    return this.http.get<ResponseDto>( this.url + '/' );
  }

  // getTotalCount(): Observable<ResponseDto> {
  //   return this.http.get<ResponseDto>( this.url + "/totalcount" );
  // }

  getHospitalPatientCount(): Observable<ResponseDto> {
    return this.http.get<ResponseDto>( this.url + '/hospitalcount' );
  }

}
