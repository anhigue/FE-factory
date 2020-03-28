import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { PartInterface } from '../../../interfaces/PartInterface';
import { VehicleInterface } from '../../../interfaces/VehicleInterface';

@Injectable({
  providedIn: 'root'
})
export class PartService {

  private headers: HttpHeaders;

  constructor(
    private http: HttpClient,
  ) {
    this.headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8HttpClient');
  }

  newProduct(product: PartInterface): Observable<any> {
    return this.http.post(environment.API_BASE + '', product, {headers: this.headers});
  }

  readProduct(): Observable<PartInterface[]> {
    return this.http.get<PartInterface[]>(environment.API_BASE + '', { headers: this.headers});
  }

  updateProduct(product: PartInterface): Observable<any> {
    return this.http.put<any>(environment.API_BASE + '', product, {headers: this.headers});
  }

  deleteProduct(product: PartInterface): Observable<any> {
    return this.http.delete(environment.API_BASE + '' + product._id, {headers: this.headers});
  }

  assignVehicleProduct(product: PartInterface): Observable<any> {
    return this.http.post<any>(environment.API_BASE + '', product, {headers: this.headers});
  }

  unAssignVehicleProduct(product: PartInterface): Observable<any> {
    return this.http.put<any>(environment.API_BASE + '', product, {headers: this.headers});
  }

}
