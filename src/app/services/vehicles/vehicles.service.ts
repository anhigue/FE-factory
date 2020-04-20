import { Injectable } from '@angular/core';
import { VehicleInterface } from '../../../interfaces/VehicleInterface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
  private headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    private _USER_SERVICE: UserService
  ) {
    this.headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8HttpClient');
  }

  newVehicle(vehicle: VehicleInterface): Observable<any> {
    return this.http.post(environment.API_BASE + '/vehicle', vehicle, {headers: this.headers});
  }

  readVehicle(): Observable<VehicleInterface[]> {
    return this.http.get<VehicleInterface[]>(environment.API_BASE + '/vehicle', { headers: this.headers });
  }

  updateVehicle(vehicle: VehicleInterface): Observable<any> {
    return this.http.put<any>(environment.API_BASE + '/vehicle', vehicle, {headers: this.headers});
  }

  deleteVehicle(vehicle: VehicleInterface): Observable<any> {
    return this.http.delete(environment.API_BASE + '/vehicle/' + vehicle._id, {headers: this.headers});
  }

}
