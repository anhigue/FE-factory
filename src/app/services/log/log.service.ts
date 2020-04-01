import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LogInterface } from '../../../interfaces/LogInterface';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private headers: HttpHeaders;

  constructor(
    private http: HttpClient,
  ) {
    this.headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8HttpClient');
  }

  newLog(log: LogInterface): Observable<any> {
    return this.http.post(environment.API_BASE + '/log', log, {headers: this.headers});
  }

  readLog(): Observable<LogInterface[]> {
    return this.http.get<LogInterface[]>(environment.API_BASE + '/log', { headers: this.headers});
  }

}
