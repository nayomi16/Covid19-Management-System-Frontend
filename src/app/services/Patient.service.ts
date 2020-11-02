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
}
