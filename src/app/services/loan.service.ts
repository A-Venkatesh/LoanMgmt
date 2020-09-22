import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'https://loanmgmt.herokuapp.com/loan';
@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http: HttpClient) { }

  create(data): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  get(): Observable<any> {
    return this.http.get(baseUrl);
  }
  getLoans(): Observable<any> {
    return this.http.get(baseUrl + '/get');
  }
  pay(index, code): Observable<any> {
    return this.http.post(baseUrl + '/pay', code + '|' + index);
  }
}
