import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserOutGuard implements CanActivate {
  constructor(
    private _USER_SERVICE: UserService,
    private router: Router
  ) {}

  canActivate(): boolean{
    if (this._USER_SERVICE.IsLogged()) {
      return true;
    } else {
      this.router.navigateByUrl('login');
      return false;
    }
  }
}
