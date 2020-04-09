import { Component, OnInit, ViewChild } from '@angular/core';
import { StatusInterface } from '../../../interfaces/StatusInterface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CrudInterface } from '../../utiles/crudInterface';
import { DialogService } from '../../services/dialog/dialog.service';
import { StatusService } from '../../services/status/status.service';
import { LogService } from '../../services/log/log.service';
import { LogInterface } from '../../../interfaces/LogInterface';
import { StatusDialogComponent } from '../status-dialog/status-dialog.component';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit, CrudInterface<StatusInterface> {

  status: StatusInterface[] = [];
  dataSource: MatTableDataSource<StatusInterface>;
  displayedColumns: string[] = [
    'name',
    'options'
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private _DIALOG_SERVIE: DialogService,
    private _STATUS_SERVICE: StatusService,
    private _LOG_SERVICE: LogService,
    private _USER_SERVICE: UserService
  ) { }

  ngOnInit() {
    this.getStatus();
  }

  private getStatus(): void {
    try {
      this._STATUS_SERVICE.readStatus().subscribe((value: any[]) => {
        if (value) {
          this.status = value;
          this.dataSource = new MatTableDataSource<StatusInterface>(
            this.status
          );
          this.dataSource.paginator = this.paginator;
        }
      });
    } catch (error) {
      this._DIALOG_SERVIE.showError(
        'Error',
        'Error al obtener a los estados de pedido.',
        JSON.stringify(error.name)
      );
    }
  }

  private registerAction(log: LogInterface): void {
    try {
      this._LOG_SERVICE.newLog(log).subscribe((state: any) => {
        if (state) {
          this._DIALOG_SERVIE.showSuccess();
          this.getStatus();
        }
      });
    } catch (error) {
      this._DIALOG_SERVIE.showError(
        'Error',
        'Error al registrar la transaccion.',
        JSON.stringify(error.name)
      );
    }
  }

  private createStatus(status: StatusInterface): void {
    try {
      this._STATUS_SERVICE.newStatus(status).subscribe((value: any) => {
        if (value) {
          this.registerAction({
            action: 'create status',
            date: new Date(),
            user: this._USER_SERVICE.getUser()
          });
        }
      });
    } catch (error) {
      this._DIALOG_SERVIE.showError(
        'Error',
        'Error al crear un nuevo estado de pedido.',
        JSON.stringify(error.name)
      );
    }
  }

  wantCreate(item?: StatusInterface): void {
    try {
      this._DIALOG_SERVIE.shareData = {
        name: null,
      };
      this._DIALOG_SERVIE
        .openDialog(StatusDialogComponent)
        .beforeClosed()
        .subscribe((value: any) => {
          if (value) {
            this.createStatus(value);
          }
        });
    } catch (error) {
      this._DIALOG_SERVIE.showError(
        'Error',
        'Error al crear un nuevo estado de pedido.',
        JSON.stringify(error.name)
      );
    }
  }

  wantEdit(item?: StatusInterface): void {
  }

  wantDelete(item?: StatusInterface): void {
  }

}
