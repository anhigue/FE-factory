import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ClientService } from '../services/client/client.service';

@Injectable({
  providedIn: 'root'
})
export class ConsultClientGuard implements CanActivate {

  constructor(
    private _CLIENT_SERVICE: ClientService
  ) {}

  canActivate(): boolean {
    try {
      const currentClient = this._CLIENT_SERVICE.readClientLocalStorage();

      if (currentClient) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

}
