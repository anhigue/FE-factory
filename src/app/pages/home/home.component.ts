import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { DialogService } from '../../services/dialog/dialog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  url: string[];

  loggedIn: boolean;

  constructor(
    private router: Router,
    private _USER_SERVICE: UserService,
    private _DIALOG_SERVICE: DialogService
  ) {
    this.getUrlTags();
  }

  ngOnInit() {}

  getUrlTags(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url.split('/');
      }
    });
  }

  logout(): void {
    try {
      this._USER_SERVICE.Logout();
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al salir de la sesion.',
        JSON.stringify(error.name)
      );
    }
  }
}
