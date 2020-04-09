import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClientInterface } from '../../../interfaces/ClientInterface';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private route: Router
  ) {
    this.headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8HttpClient');
  }

  newClient(client: ClientInterface): Observable<any> {
    return this.http.post(environment.API_BASE + '/client', client, {headers: this.headers});
  }

  readClient(): Observable<ClientInterface[]> {
    return this.http.get<ClientInterface[]>(environment.API_BASE + '/client', { headers: this.headers});
  }

  updateClient(client: ClientInterface): Observable<any> {
    return this.http.put<any>(environment.API_BASE + '/client', client, {headers: this.headers});
  }

  deleteClient(client: ClientInterface): Observable<any> {
    return this.http.delete(environment.API_BASE + '/client/' + client._id, {headers: this.headers});
  }

  LogInClient(client: ClientInterface): Observable<any> {
    return this.http.post<any>(environment.API_BASE + '/client/login', client, {headers: this.headers});
  }

  setLogInClient(Client: ClientInterface, token: string): void {
    localStorage.setItem(environment.TOKEN_CLIENT, token);
    this.route.navigateByUrl('/client/' + Client.url);
  }

  LogOutClient(): void {
    localStorage.removeItem(environment.TOKEN_CLIENT);
    this.route.navigateByUrl('/login/client');
  }

}
