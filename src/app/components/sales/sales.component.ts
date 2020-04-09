import { Component, OnInit, ViewChild } from '@angular/core';
import { SaleInterface } from '../../../interfaces/SaleInterface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DialogService } from '../../services/dialog/dialog.service';
import { SalesService } from '../../services/sales/sales.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'date',
    'total',
    'client',
    'options'
  ];
  sales: SaleInterface[] = [];
  dataSource: MatTableDataSource<SaleInterface>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _DIALOG_SERVICE: DialogService,
    private _SALE_SERVICE: SalesService,
    private _USER_SERVICE: UserService
  ) {}

  ngOnInit() {
    this.getSales();
  }

  private getSales(): void {
    try {
      this._SALE_SERVICE.readSale().subscribe( (value: SaleInterface[]) => {
        if (value) {
          this.sales = value;
          this.dataSource = new MatTableDataSource<SaleInterface>(this.sales);
          this.dataSource.paginator = this.paginator;
        }
      });
      this.sales.push({
        id: 1,
        client: {
          _id: '1',
          name: 'Javier Alvarez',
        },
        total: 200,
        products: [
          { _id: 1, name: 'Bujia', price: 200 }
        ]
      });
      this.dataSource = new MatTableDataSource<SaleInterface>(this.sales);
      this.dataSource.paginator = this.paginator;
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        error,
        'Error',
        'Error al obtener los datos de las ordenes de ventas.'
      );
    }
  }
}
