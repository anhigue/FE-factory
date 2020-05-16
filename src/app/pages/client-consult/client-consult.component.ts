import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from '../../services/client/client.service';
import { DialogService } from '../../services/dialog/dialog.service';
import { OrderInterface } from '../../../interfaces/OrderInterface';
import { ClientInterface } from 'src/interfaces/ClientInterface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PartService } from '../../services/part/part.service';

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
    private _DIALOG_SERVICE: DialogService,
    private _PART_SERVICE: PartService
  ) {
    this.client = this._CLIENT_SERVICE.readClientLocalStorage();
  }

  ngOnInit() {
    this.getParts();
    this.getClientData();
  }

  private fixOrders(orders: any[]): OrderInterface[] {
    try {
      const fixedOrder: OrderInterface[] = [];
      const parts = JSON.parse(localStorage.getItem('PARTS'));

      /* loop to update order */
      orders.forEach((item) => {
        let orderPush: any = {};
        if (item.id !== 0) {
          orderPush._id = item._id;
          orderPush.client = item.client;
          orderPush.factory = null;
          orderPush.id = item.id;
          orderPush.status = item.status;
          orderPush.timeCreate = item.timeCreate;
          orderPush.timeDelivery = item.timeDelivery;
          orderPush.timeFullDelivery = item.timeFullDelivery;

          /* parts asigns */
          const partsAssign: any[] = [];
          item.parts.forEach((itemPart) => {
            parts.forEach((part) => {
              if (part.partNo === itemPart.product.partNo) {
                partsAssign.push({
                  product: part,
                  unitCost: part.price,
                  howMany: itemPart.stockSale,
                  total: part.price * itemPart.stockSale,
                });
              }
            });
          });

          orderPush.parts = partsAssign;

          /* update total */
          let sum = 0;
          partsAssign.forEach((element) => {
            sum += element.total;
          });

          orderPush.total = sum;

        } else {
          orderPush = item;
        }

        fixedOrder.push(orderPush);
      });

      return fixedOrder;
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al convertir la informacion.',
        JSON.stringify(error.name)
      );
    }
  }

  private getParts(): void {
    try {
      this._PART_SERVICE.readProduct().subscribe((value: any[]) => {
        if (value) {
          localStorage.setItem('PARTS', JSON.stringify(value));
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al obtener los vehiculos.',
        JSON.stringify(error.name)
      );
    }
  }

  getClientData(): void {
    try {
      this._CLIENT_SERVICE
        .readDataClient(this.client)
        .subscribe((value: any) => {
          if (value.ok) {
            this.ordersClient = this.fixOrders(value.orders);
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
