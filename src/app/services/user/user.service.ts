import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UserInterface } from '../../../interfaces/UserInterface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private route: Router
  ) {
    this.headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );
  }

  LogIn(User: any): Observable<any> {
    return this.http.post<any>(environment.API_BASE + '/usuario/login', User, {
      headers: this.headers
    });
  }

  setLogIn(User: UserInterface, log: boolean): void {
    this.cookieService.set(environment.USER_KEY, JSON.stringify(User));
    this.route.navigateByUrl('home/dashboard');
  }

  IsLogged(): boolean {
    if (this.cookieService.check(environment.USER_KEY)) {
      return true;
    }
    return false;
  }

  getUser(): any {
    return JSON.parse(
      this.cookieService.get(environment.USER_KEY) || '{ "access": "false" }'
    );
  }

  Logout(): void {
    this.cookieService.delete(environment.USER_KEY);
    this.route.navigateByUrl('/login');
  }

  createUser(User: any): Observable<any> {
    return this.http.post(environment.API_BASE + '', User, {
      headers: this.headers
    });
  }

  readUser(): Observable<any> {
    return this.http.post(environment.API_BASE + '', {
      headers: this.headers
    });
  }

  updateUser(User: any) {
    return this.http.put(environment.API_BASE + '', User, {
      headers: this.headers
    });
  }

  resetPass(User: any) {
    return this.http.post(environment.API_BASE + '', User, {
      headers: this.headers
    });
  }

  setPassInCookies(SecretPass: string): void {
    this.cookieService.set(environment.USER_RESET_KEY, SecretPass);
  }

  getResetPass(): string {
    return this.cookieService.get(environment.USER_RESET_KEY);
  }

  updatePass(UserPass: any): Observable<any> {
    return this.http.post<any>(environment.API_BASE + '', UserPass, {
      headers: this.headers
    });
  }
}
