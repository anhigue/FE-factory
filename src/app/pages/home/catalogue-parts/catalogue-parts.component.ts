import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {
  OrderInterface,
  OrderProductInterface
} from '../../../../interfaces/OrderInterface';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from '../../../services/dialog/dialog.service';
import { OrderService } from '../../../services/order/order.service';
import { CrudInterface } from '../../../utiles/crudInterface';
import { ClientInterface } from '../../../../interfaces/ClientInterface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientSelectComponent } from '../../../components/client-select/client-select.component';
import { PartSelectComponent } from '../../../components/part-select/part-select.component';
import { LogInterface } from '../../../../interfaces/LogInterface';
import { LogService } from '../../../services/log/log.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ReportInterface } from '../../../../interfaces/ReportInterface';

@Component({
  selector: 'app-catalogue-parts',
  templateUrl: './catalogue-parts.component.html',
  styleUrls: ['./catalogue-parts.component.scss']
})
export class CataloguePartsComponent
  implements OnInit, CrudInterface<OrderInterface> {
  orders: OrderInterface[] = [];
  dataSource: MatTableDataSource<OrderInterface>;
  displayedColumns: string[] = [
    'client',
    'total',
    'timeDelivery',
    'timeCreate',
    'timeFullDelivery',
    'status',
    'options'
  ];

  dataSourcePartOrder: MatTableDataSource<OrderInterface>;
  displayedColumnsOrder: string[] = [
    'product',
    'unitCost',
    'howMany',
    'total',
    'options'
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  clientOrder: ClientInterface = {
    _id: null,
    address: null,
    name: null,
    status: null,
    timeDelivery: null,
    token: null
  };
  clientOrderValidate: FormGroup;

  partOrder: OrderProductInterface[] = [];
  partOrderSelect: OrderProductInterface = {
    howMany: 0,
    product: null,
    unitCost: 0,
    total: 0
  };

  total = 0;
  timeDelivery: Date;
  timeCreate?: Date;
  timeFullDelivery?: Date;
  status?: boolean;

  reports: ReportInterface[] = [];
  createReport: ReportInterface = {
    _id: null,
    report: [],
    factory: null,
    status: null,
    timeCreate: null,
    user: null
  };
  formReport: FormGroup;

  dataSourceReportOrder: MatTableDataSource<ReportInterface>;
  displayedColumnsReportOrder: string[] = [
    'status',
    'timeCreate',
    'factory',
    'dateInit',
    'dateFinal',
  ];

  addDays(date, days): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  setValues(): void {
    this.total = this.getTotalCostParts();
    this.timeDelivery = new Date();
    this.timeCreate = new Date();
    this.timeFullDelivery = this.addDays(
      this.timeDelivery,
      this.clientOrder.timeDelivery
    );
    this.status = false;
  }

  constructor(
    private _DIALOG_SERVICE: DialogService,
    private _ORDER_SERVICE: OrderService,
    private _FORM_BUILDER: FormBuilder,
    private _LOG_SERVICE: LogService
  ) {}

  ngOnInit() {
    this.getOrder();
    this.getReports();
    this.getPartOrder();
    this.validateClient();
    this.validateReportRequest();
  }

  public validateClient(): void {
    this.clientOrderValidate = this._FORM_BUILDER.group({
      name: ['', Validators.required],
      timeDelivery: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  private getOrder(): void {
    try {
      this._ORDER_SERVICE.readSale().subscribe((value: any) => {
        if (value) {
          this.orders = value;
          this.dataSource = new MatTableDataSource<OrderInterface>(this.orders);
          this.dataSource.paginator = this.paginator;
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al obtener las ordenes de repuestos de la fabrica.',
        JSON.stringify(error.name)
      );
    }
  }

  private registerAction(log: LogInterface): void {
    try {
      this._LOG_SERVICE.newLog(log).subscribe((state: any) => {
        if (state) {
          this._DIALOG_SERVICE.showSuccess();
          this.getOrder();
          this.getReports();
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al registrar la transaccion.',
        JSON.stringify(error.name)
      );
    }
  }

  private createOrder(order): void {
    try {
      this._ORDER_SERVICE.newSale(order).subscribe((value: any) => {
        if (value) {
          this.registerAction({
            action: 'create order parts',
            date: new Date(),
            user: {
              name: 'Andres',
              lastName: 'Higueros'
            }
          });
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al crear la orden de repuestos',
        JSON.stringify(error.name)
      );
    }
  }

  wantCreate(item?: OrderInterface): void {
    try {
      const order: OrderInterface = {
        client: this.clientOrder,
        factory: null,
        status: false,
        timeCreate: new Date(),
        timeDelivery: this.timeDelivery,
        timeFullDelivery: this.addDays(
          this.timeDelivery,
          this.clientOrder.timeDelivery
        ),
        total: this.getTotalCostParts(),
        parts: this.partOrder
      };

      this._DIALOG_SERVICE
        .showDelete(
          'Guardar',
          'Estas seguro que quieres guardar esta orden de repuestos.',
          null
        )
        .beforeClosed()
        .subscribe((value: any) => {
          if (value) {
            this.createOrder(order);
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al crear la orden de repuestos',
        JSON.stringify(error.name)
      );
    }
  }

  wantEdit(item?: OrderInterface): void {}

  private deleteOrder(order: OrderInterface): void {
    try {
      this._ORDER_SERVICE.deleteSale(order).subscribe((value: any) => {
        if (value) {
          this.registerAction({
            action: 'delete order parts',
            date: new Date(),
            user: {
              name: 'Andres',
              lastName: 'Higueros'
            }
          });
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al eliminar una orden de repuestos',
        JSON.stringify(error.name)
      );
    }
  }

  wantDelete(item?: OrderInterface): void {
    try {
      this._DIALOG_SERVICE
        .showDelete(
          'Eliminar',
          'Estas seguro de que quieres eliminar esta orden de repuestos',
          null
        )
        .beforeClosed()
        .subscribe((value: any) => {
          if (value) {
            this.deleteOrder(item);
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al eliminar una orden de repuestos',
        JSON.stringify(error.name)
      );
    }
  }

  wantSelectClient(): void {
    try {
      this._DIALOG_SERVICE.width = '60%';
      this._DIALOG_SERVICE
        .openDialog(ClientSelectComponent)
        .beforeClosed()
        .subscribe((value: any) => {
          if (value) {
            this.clientOrder = value;
            this.setValues();
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al seleccionar un cliente existente.',
        JSON.stringify(error.name)
      );
    }
  }

  private getPartOrder(): void {
    try {
      this.dataSourcePartOrder = new MatTableDataSource<OrderInterface>(
        this.partOrder
      );
      this.dataSourcePartOrder.paginator = this.paginator;
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al obtener los repuestos de la orden.',
        JSON.stringify(error.name)
      );
    }
  }

  wantSelectPart(): void {
    try {
      this._DIALOG_SERVICE
        .openDialog(PartSelectComponent)
        .beforeClosed()
        .subscribe((value: any) => {
          if (value) {
            this.partOrderSelect.product = value;
            this.partOrderSelect.unitCost = value.price;
            this.partOrder.push(this.partOrderSelect);
            this.partOrderSelect = {
              howMany: 0,
              product: null,
              unitCost: 0,
              total: 0
            };
            this.getPartOrder();
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al seleccionar un producto existente.',
        JSON.stringify(error.name)
      );
    }
  }

  wantDeletePart(item: any): void {
    try {
      const index = this.partOrder.indexOf(item);
      if (index > -1) {
        this.partOrder.splice(index, 1);
        this.getPartOrder();
      }
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al eliminar un producto de la lista.',
        JSON.stringify(error.name)
      );
    }
  }

  getTotalCostParts(): number {
    return this.partOrder
      .map(t => t.total)
      .reduce((acc, value) => acc + value, 0);
  }

  onChangeParInfo(item: OrderProductInterface): void {
    try {
      const index = this.partOrder.indexOf(item);

      if (index > -1) {
        this.partOrder[index] = {
          product: item.product,
          howMany: item.howMany,
          total: item.howMany * item.unitCost,
          unitCost: item.unitCost
        };
        this.getPartOrder();
      }
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al actualizar un producto de la lista.',
        JSON.stringify(error.name)
      );
    }
  }

  private updateState(order: OrderInterface): void {
    try {
      this._ORDER_SERVICE.updateSale(order, 'state').subscribe((value: any) => {
        if (value) {
          this.registerAction({
            action: 'update state order parts',
            date: new Date(),
            user: {
              name: 'Andres',
              lastName: 'Higueros'
            }
          });
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al cerrar la orden de repuestos.',
        JSON.stringify(error.name)
      );
    }
  }

  wantEditState(item: OrderInterface): void {
    try {
      this._DIALOG_SERVICE
        .showDelete(
          'Cerrar Orden',
          'Estas seguro de que quieres cerrar la orden',
          null
        )
        .beforeClosed()
        .subscribe((value: any) => {
          if (value) {
            console.log(item);
            this.updateState(item);
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al cerrar la orden de repuestos.',
        JSON.stringify(error.name)
      );
    }
  }

  onChange(ms: MatSlideToggleChange): void {
    this.createReport.status = ms.checked;
  }

  validateReportRequest(): void {
    this.formReport = this._FORM_BUILDER.group({
      status: ['', Validators.required],
      sort: ['', Validators.required],
      dateInit: ['', Validators.required],
      dateFinal: ['', Validators.required]
    });
  }

  public wantReport(): void {
    try {
      this.createReport = {
        _id: null,
        report: null,
        factory: null,
        status: this.formReport.get('status').value,
        timeCreate: new Date(),
        user: null,
        dateFinal: this.formReport.get('dateFinal').value,
        dateInit: this.formReport.get('dateInit').value,
        sort: this.formReport.get('sort').value
      };

      this._ORDER_SERVICE
        .newReport(this.createReport)
        .subscribe((value: any) => {
          if (value) {
            this.createReport = {
              _id: null,
              report: value,
              factory: null,
              status: this.formReport.get('status').value,
              timeCreate: new Date(),
              user: null,
              dateFinal: this.formReport.get('dateFinal').value,
              dateInit: this.formReport.get('dateInit').value,
              sort: this.formReport.get('sort').value
            };

            console.log(this.createReport);
            if (this.createReport.report.length === 0) {
              this._DIALOG_SERVICE.showError(
                'Consulta Vacia',
                'La consulta que acabas de realizar no cuenta con infromacion alguna.',
                null
              );
            }
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al crear un reporte de orden de repuestos.',
        JSON.stringify(error.name)
      );
    }
  }

  private newReport(report: ReportInterface): void {
    try {
      this._ORDER_SERVICE.registerReport(report).subscribe((value: any) => {
        if (value) {
          this.registerAction({
            action: 'register a new report of order parts',
            date: new Date(),
            user: {
              name: 'Andres',
              lastName: 'Higueros'
            }
          });
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al crear un reporte de orden de repuestos.',
        JSON.stringify(error.name)
      );
    }
  }

  private getReports(): void {
    try {
      this._ORDER_SERVICE.readReport().subscribe((value: any) => {
        if (value) {
          this.reports = value;
          this.dataSourceReportOrder = new MatTableDataSource<ReportInterface>(
            this.reports
          );
          this.dataSourceReportOrder.paginator = this.paginator;
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al obtener los reportes de ordenes de repuestos.',
        JSON.stringify(error.name)
      );
    }
  }

  wantCreateReport(): void {
    try {
      this._DIALOG_SERVICE.showDelete('Guardar', 'Estas seguro de guardar este reporte', null).beforeClosed().subscribe( (value: any) => {
        if (value) {
          this.newReport(this.createReport);
        }
      })
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al crear un reporte de orden de repuestos.',
        JSON.stringify(error.name)
      );
    }
  }
}
