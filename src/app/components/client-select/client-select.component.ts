import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from '../../services/dialog/dialog.service';
import { ClientService } from '../../services/client/client.service';
import { MatPaginator } from '@angular/material/paginator';
import { ClientInterface } from '../../../interfaces/ClientInterface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-client-select',
  templateUrl: './client-select.component.html',
  styleUrls: ['./client-select.component.scss']
})
export class ClientSelectComponent implements OnInit {
  clients: ClientInterface[] = [];
  dataSource: MatTableDataSource<ClientInterface>;
  displayedColumns: string[] = [
    'name',
    'address',
    'timeDelivery',
    'options'
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private _DIALOG_SERVIE: DialogService,
    private _CLIENT_SERVICE: ClientService,
    public dialogRef: MatDialogRef<ClientSelectComponent>,
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
}
