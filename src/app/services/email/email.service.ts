import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { EmailInterface } from '../../../interfaces/EmailInterface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private headers: HttpHeaders;

  constructor(
    private http: HttpClient,
  ) {
    this.headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8HttpClient');
  }

  sendMail(mail: EmailInterface): Observable<any> {
    return this.http.post<any>(environment.API_BASE + '/email', mail, { headers: this.headers });
  }
}
