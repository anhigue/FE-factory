import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudInterface } from '../../utiles/crudInterface';
import { ClientInterface } from '../../../interfaces/ClientInterface';
import { ClientService } from '../../services/client/client.service';
import { DialogService } from '../../services/dialog/dialog.service';
import { ClientDialogComponent } from '../client-dialog/client-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LogService } from '../../services/log/log.service';
import { LogInterface } from '../../../interfaces/LogInterface';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit, CrudInterface<ClientInterface> {
  clients: ClientInterface[] = [];
  dataSource: MatTableDataSource<ClientInterface>;
  displayedColumns: string[] = [
    'name',
    'address',
    'status',
    'timeDelivery',
    'options'
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private _DIALOG_SERVIE: DialogService,
    private _CLIENT_SERVICE: ClientService,
    private _LOG_SERVICE: LogService
  ) {}

  ngOnInit() {
    this.getClient();
  }

  private getClient(): void {
    try {
      this._CLIENT_SERVICE.readClient().subscribe((value: any[]) => {
        if (value) {
          this.clients = value;
          this.dataSource = new MatTableDataSource<ClientInterface>(
            this.clients
          );
          this.dataSource.paginator = this.paginator;
        }
      });
    } catch (error) {
      this._DIALOG_SERVIE.showError(
        'Error',
        'Error al obtener a los clientes.',
        JSON.stringify(error.name)
      );
    }
  }

  private registerAction(log: LogInterface): void {
    try {
      this._LOG_SERVICE.newLog(log).subscribe((state: any) => {
        if (state) {
          this._DIALOG_SERVIE.showSuccess();
          this.getClient();
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
  private createClient(client: ClientInterface): void {
    try {
      this._CLIENT_SERVICE.newClient(client).subscribe((value: any) => {
        if (value) {
          this.registerAction({
            action: 'create client',
            date: new Date(),
            user: {
              name: 'Andres',
              lastName: 'Higueros'
            }
          });
        }
      });
    } catch (error) {
      this._DIALOG_SERVIE.showError(
        'Error',
        'Error al crear un nuevo cliente.',
        JSON.stringify(error.name)
      );
    }
  }

  wantCreate(item?: ClientInterface): void {
    try {
      this._DIALOG_SERVIE.shareData = {
        name: null,
        timeDelivery: null,
        status: null,
        token: null,
        address: null
      };
      this._DIALOG_SERVIE
        .openDialog(ClientDialogComponent)
        .beforeClosed()
        .subscribe((value: any) => {
          if (value) {
            this.createClient(value);
          }
        });
    } catch (error) {
      this._DIALOG_SERVIE.showError(
        'Error',
        'Error al crear un nuevo cliente.',
        JSON.stringify(error.name)
      );
    }
  }

  private updateClient(client: ClientInterface): void {
    try {
      this._CLIENT_SERVICE.updateClient(client).subscribe((value: any) => {
        if (value) {
          this.registerAction({
            action: 'Update client',
            date: new Date(),
            user: {
              name: 'Andres',
              lastName: 'Higueros'
            }
          });
        }
      });
    } catch (error) {
      this._DIALOG_SERVIE.showError(
        'Error',
        'Error al actualizar un cliente.',
        JSON.stringify(error.name)
      );
    }
  }

  wantEdit(item?: ClientInterface): void {
    try {
      this._DIALOG_SERVIE.shareData = item;
      this._DIALOG_SERVIE
        .openDialog(ClientDialogComponent)
        .beforeClosed()
        .subscribe((value: any) => {
          if (value) {
            this.updateClient(value);
          }
        });
    } catch (error) {
      this._DIALOG_SERVIE.showError(
        'Error',
        'Error al actualizar un cliente.',
        JSON.stringify(error.name)
      );
    }
  }

  private deleteClient(client: ClientInterface): void {
    try {
      this._CLIENT_SERVICE.deleteClient(client).subscribe((value: any) => {
        if (value) {
          this.registerAction({
            action: 'delete client',
            date: new Date(),
            user: {
              name: 'Andres',
              lastName: 'Higueros'
            }
          });
        }
      });
    } catch (error) {
      this._DIALOG_SERVIE.showError(
        'Error',
        'Error al eliminar un cliente.',
        JSON.stringify(error.name)
      );
    }
  }

  wantDelete(item?: ClientInterface): void {
    try {
      this._DIALOG_SERVIE
        .showDelete(
          'Eliminar',
          'Estas seguro de que quieres eliminar este cliente',
          null
        )
        .beforeClosed()
        .subscribe((value: any) => {
          if (value) {
            this.deleteClient(item);
          }
        });
    } catch (error) {
      this._DIALOG_SERVIE.showError(
        'Error',
        'Error al eliminar un cliente.',
        JSON.stringify(error.name)
      );
    }
  }
}
