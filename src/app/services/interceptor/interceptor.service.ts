import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import {
  HttpInterceptor,
  HttpHeaders,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor(private _USER_SERVICE: UserService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    try {
      console.log('interceptor');

      const token: string = this._USER_SERVICE.getToken();

      if (!token) {
        return next.handle(req);
      }

      const headers = new HttpHeaders({
        Authorization: token,
      });

      const reqClone = req.clone({
        headers
      });

      return next.handle(reqClone);

    } catch (error) {
      console.log(error);
    }
  }
}
