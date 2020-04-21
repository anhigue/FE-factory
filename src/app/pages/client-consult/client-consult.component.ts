import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client/client.service';
import { DialogService } from '../../services/dialog/dialog.service';
import { OrderInterface } from '../../../interfaces/OrderInterface';
import { ClientInterface } from 'src/interfaces/ClientInterface';

@Component({
  selector: 'app-client-consult',
  templateUrl: './client-consult.component.html',
  styleUrls: ['./client-consult.component.scss'],
})
export class ClientConsultComponent implements OnInit {
  ordersClient: OrderInterface[] = [];
  client: ClientInterface;

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
          console.log(value);
          if (value) {
            this.ordersClient = value;
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
