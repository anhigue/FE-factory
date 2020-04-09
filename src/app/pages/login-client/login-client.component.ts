import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ClientService } from '../../services/client/client.service';
import { DialogService } from '../../services/dialog/dialog.service';

@Component({
  selector: 'app-login-client',
  templateUrl: './login-client.component.html',
  styleUrls: ['./login-client.component.scss']
})
export class LoginClientComponent implements OnInit {
  userValidation: FormGroup;

  constructor(
    private _CLIENT_SERVICE: ClientService,
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
      this._CLIENT_SERVICE.LogInClient(user).subscribe((value: any) => {
        if (value.ok) {
          this._CLIENT_SERVICE.setLogInClient(value.user, value.token);
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
