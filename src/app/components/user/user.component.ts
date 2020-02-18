import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { UserInterface } from '../../../interfaces/UserInterface';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from '../../services/dialog/dialog.service';
import { UserService } from '../../services/user/user.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users: UserInterface[];
  displayedColumns: string[] = ['position', 'name', 'last', 'options'];
  dataSource: MatTableDataSource<UserInterface>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _DIALOG_SERVICE: DialogService,
    private _USER_SERVICE: UserService
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  openDialogUserCreate() {
    this._DIALOG_SERVICE.shareData = {};
    this._DIALOG_SERVICE
      .openDialog(DialogUserComponent)
      .beforeClosed()
      .subscribe(
        (value: UserInterface) => {
          if (value) {
            this.createUser(value);
          } else {
            this._DIALOG_SERVICE.showError();
          }
        },
        err => {
          this._DIALOG_SERVICE.showError();
          console.log(err);
        }
      );
  }

  openDialogUserUpdate(user: UserInterface) {
    this._DIALOG_SERVICE.shareData = user;
    this._DIALOG_SERVICE
      .openDialog(DialogUserComponent)
      .beforeClosed()
      .subscribe(
        (value: UserInterface) => {
          if (value) {
            this.updateUser(value);
          } else {
            this._DIALOG_SERVICE.showError();
          }
        },
        err => {
          this._DIALOG_SERVICE.showError();
          console.log(err);
        }
      );
  }

  private getUsers() {
    this._USER_SERVICE.readUser().subscribe((res: any[]) => {
      if (res) {
        this.users = res;
        this.dataSource = new MatTableDataSource<UserInterface>(this.users);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  private createUser(User: UserInterface) {
    console.log(User);
    this._USER_SERVICE.createUser(User).subscribe((value: any) => {
      if (value) {
        this._DIALOG_SERVICE.showSuccess();
        this.getUsers();
      } else {
        this._DIALOG_SERVICE.showError();
      }
    });
  }

  private updateUser(User: UserInterface) {
    this._USER_SERVICE.updateUser(User).subscribe((value: any) => {
      if (value) {
        this._DIALOG_SERVICE.showSuccess();
        this.getUsers();
      }
    });
  }

  private deleteUser(User: UserInterface) {
    this._USER_SERVICE.deleteUser(User).subscribe(value => {
      if (value) {
        this._DIALOG_SERVICE.showSuccess();
        this.getUsers();
      }
    });
  }
}

@Component({
  selector: 'app-dialog-user',
  template: `
    <h2 mat-dialog-title>Opciones de Usuario</h2>
    <mat-dialog-content>
      <form [formGroup]="formGroupUser">
        <div class="row">
          <div class="col-md-12">
            <mat-form-field>
              <input
                matInput
                placeholder="Nombre"
                type="text"
                required
                [(ngModel)]="userUpdate.name"
                formControlName="name"
              />
            </mat-form-field>
          </div>
        </div>
        <hr />
        <div class="row">
          <div class="col-md-6">
            <mat-form-field>
              <input
                matInput
                placeholder="Apellido"
                type="text"
                required
                [(ngModel)]="userUpdate.lastName"
                formControlName="lastName"
              />
            </mat-form-field>
          </div>
          <div class="col-md-6">
            <mat-form-field>
              <input
                matInput
                placeholder="Puesto"
                type="text"
                required
                [(ngModel)]="userUpdate.position"
                formControlName="position"
              />
            </mat-form-field>
          </div>
        </div>
        <hr />
        <div class="row">
          <div class="col-md-12">
            <mat-form-field>
              <input
                matInput
                placeholder="Contrasena"
                type="password"
                required
                [(ngModel)]="userUpdate.password"
                formControlName="password"
              />
            </mat-form-field>
          </div>
        </div>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false">Cancelar</button>
      <button
        mat-button
        [mat-dialog-close]="userUpdate"
        *ngIf="formGroupUser.valid"
      >
        Ok.
      </button>
    </mat-dialog-actions>
  `,
  styles: ['mat-form-field {width: 100%;}']
})
export class DialogUserComponent implements OnInit {
  public userUpdate: UserInterface;
  formGroupUser: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserInterface,
    private _FORM_BUILDER: FormBuilder
  ) {}

  ngOnInit() {
    this.userUpdate = this.data;
    this.formGroupUser = this._FORM_BUILDER.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      position: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
