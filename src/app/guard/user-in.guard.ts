import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserInGuard implements CanActivate {
  constructor(
    private _USER_SERVICE: UserService,
    private route: Router,
  ) {}

  canActivate(): boolean {
      if (this._USER_SERVICE.IsLogged()) {
        this.route.navigateByUrl('home');
        return false;
      } else {
        return true;
      }
  }
}
