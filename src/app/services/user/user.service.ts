import { Injectable, ErrorHandler } from '@angular/core';
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

  LogIn(User: UserInterface): Observable<UserInterface> {
    return this.http.post<UserInterface>(environment.API_BASE + '', User, {
      headers: this.headers
    });
  }

  setLogIn(User: UserInterface): void {
    this.cookieService.set(environment.USER_KEY, JSON.stringify(User));
    this.route.navigateByUrl('home');
  }

  IsLogged(): boolean {
    if (this.cookieService.check(environment.USER_KEY)) {
      return true;
    }
    return false;
  }

 getUser(): any {
    try {
      return JSON.parse(this.cookieService.get(environment.USER_KEY));
    } catch (error) {
      return error;
    }
  }

  Logout(): void {
    this.cookieService.delete(environment.USER_KEY);
    this.route.navigateByUrl('/login');
  }

  createUser(User: UserInterface): Observable<boolean> {
    return this.http.post<boolean>(environment.API_BASE + '', User, {
      headers: this.headers
    });
  }

  readUser(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(environment.API_BASE + '', {
      headers: this.headers
    });
  }

  readUserById(UserId: number): Observable<UserInterface> {
    return this.http.get<UserInterface>(environment.API_BASE + '' + UserId, {
      headers: this.headers
    });
  }

  updateUser(User: UserInterface): Observable<UserInterface> {
    return this.http.post<UserInterface>(environment.API_BASE + '', User, {
      headers: this.headers
    });
  }

  deleteUser(User: UserInterface): Observable<boolean> {
    return this.http.post<boolean>(environment.API_BASE + '', User, {
      headers: this.headers
    });
  }
}
