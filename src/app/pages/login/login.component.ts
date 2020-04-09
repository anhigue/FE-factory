import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { DialogService } from '../../services/dialog/dialog.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserLogInInterface } from '../../../interfaces/UserLogInInterface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userValidation: FormGroup;

  constructor(
    private _USER_SERVICE: UserService,
    private _DIALOG_SERVICE: DialogService,
    private _FORM_BUILDER: FormBuilder
  ) {}

  ngOnInit() {
    this.validateUser();
  }

  validateUser(): void {
    this.userValidation = this._FORM_BUILDER.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login(): void {
    try {
      const user = this.userValidation.value;
      this._USER_SERVICE.LogIn(user).subscribe((value: UserLogInInterface) => {
        if (value.ok) {
          this._USER_SERVICE.setLogIn(value.user, value.token);
        } else {
          this._DIALOG_SERVICE.showError(
            'Credenciales Invalidad',
            'Usuario o contrasena incorrectos',
            null
          );
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.showError(error, 'Error', 'Error al hacer login.');
    }
  }
}
