import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/loan';
@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http: HttpClient) { }
  // httpHeaders: HttpHeaders = new HttpHeaders({
  //   Authorization: '822042677'
  // });

  create(data): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  get(data): Observable<any> {
    return this.http.get(baseUrl, data);
  }
}
