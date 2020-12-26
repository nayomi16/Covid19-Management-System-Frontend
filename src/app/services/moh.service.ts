import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ResponseDto} from '../dto/ResponseDto';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MohService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:8080/api/v1/moh';
  // url = "http://ec2-52-73-113-153.compute-1.amazonaws.com:8080/NCMS_Project-1.0.0/api/v1/moh"

  getQueue(): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.url + '/queue');
  }

  getAllHospitals(): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.url + '/beds');
  }

  addHospital(hospital): Observable<ResponseDto > {
    return this.http.post<ResponseDto>(this.url + '/addHospital', hospital);
  }

  updateQueue(hospitalId): Observable<ResponseDto> {
    return this.http.options<ResponseDto>(this.url + '?hospitalId=' + hospitalId);
  }
}
