import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { StatusInterface } from '../../../interfaces/StatusInterface';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private headers: HttpHeaders;

  constructor(
    private http: HttpClient,
  ) {
    this.headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8HttpClient');
  }

  newStatus(status: StatusInterface): Observable<any> {
    return this.http.post<any>(environment.API_BASE + '/status', status, {headers: this.headers});
  }

  readStatus(): Observable<any> {
    return this.http.get<any>(environment.API_BASE + '/status', {headers: this.headers});
  }

  updateStatus(status: StatusInterface): Observable<any> {
    return this.http.put<any>(environment.API_BASE + '/status', status, {headers: this.headers});
  }

  deleteStatus(status: StatusInterface): Observable<any> {
    return this.http.delete<any>(environment.API_BASE + '/status/' + status._id, {headers: this.headers});
  }
}
