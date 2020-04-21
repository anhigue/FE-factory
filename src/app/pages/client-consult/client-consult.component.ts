import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from '../../services/client/client.service';
import { DialogService } from '../../services/dialog/dialog.service';
import { OrderInterface } from '../../../interfaces/OrderInterface';
import { ClientInterface } from 'src/interfaces/ClientInterface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-client-consult',
  templateUrl: './client-consult.component.html',
  styleUrls: ['./client-consult.component.scss'],
})
export class ClientConsultComponent implements OnInit {
  ordersClient: OrderInterface[] = [];
  client: ClientInterface;

  dataSource: MatTableDataSource<OrderInterface>;
  displayedColumns: string[] = [
    'total',
    'timeDelivery',
    'timeFullDelivery',
    'status',
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private _CLIENT_SERVICE: ClientService,
    private _DIALOG_SERVICE: DialogService
  ) {
    this.client = this._CLIENT_SERVICE.readClientLocalStorage();
  }

  ngOnInit() {
    this.getClientData();
  }

  getClientData(): void {
    try {
      this._CLIENT_SERVICE
        .readDataClient(this.client)
        .subscribe((value: any) => {
          if (value) {
            this.ordersClient = value;
            this.dataSource = new MatTableDataSource<OrderInterface>(this.ordersClient);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al obtener la informacion del cliente',
        JSON.stringify(error.name)
      );
    }
  }

  closeSession(): void {
    try {
      this._CLIENT_SERVICE.LogOutClient();
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al cerrar sesion de consulta',
        JSON.stringify(error.name)
      );
    }
  }
}
