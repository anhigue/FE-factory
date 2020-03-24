import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FactoryInterface } from '../../../interfaces/FactoryInterface';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FactoryService {

  private headers: HttpHeaders;

  constructor(
    private http: HttpClient,
  ) {
    this.headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8HttpClient');
  }

  newFactory(factory: FactoryInterface): Observable<any> {
    return this.http.post<any>(environment.API_BASE + '', factory, {headers: this.headers});
  }

  readFactory(): Observable<any> {
    return this.http.get<any>(environment.API_BASE + '', {headers: this.headers});
  }

  updateFactory(factory: FactoryInterface): Observable<any> {
    return this.http.put<any>(environment.API_BASE + '', factory, {headers: this.headers});
  }

  deleteFactory(factory: FactoryInterface): Observable<any> {
    return this.http.delete<any>(environment.API_BASE + '' + factory._id, {headers: this.headers});
  }
}
