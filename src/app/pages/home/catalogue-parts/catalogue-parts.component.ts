import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {
  OrderInterface,
  OrderProductInterface,
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
import { StatusInterface } from '../../../../interfaces/StatusInterface';
import { StatusService } from '../../../services/status/status.service';
import { MatSelectChange } from '@angular/material/select';
import { UserService } from '../../../services/user/user.service';
import { SendMailComponent } from '../../../components/send-mail/send-mail.component';
import { EmailInterface } from '../../../../interfaces/EmailInterface';
import { EmailService } from '../../../services/email/email.service';

@Component({
  selector: 'app-catalogue-parts',
  templateUrl: './catalogue-parts.component.html',
  styleUrls: ['./catalogue-parts.component.scss'],
})
export class CataloguePartsComponent
  implements OnInit, CrudInterface<OrderInterface> {
  orders: OrderInterface[] = [];
  dataSource: MatTableDataSource<OrderInterface>;
  displayedColumns: string[] = [
    'client',
    'total',
    'timeDelivery',
    'timeFullDelivery',
    'status',
    'options',
  ];

  dataSourcePartOrder: MatTableDataSource<OrderProductInterface>;
  displayedColumnsOrder: string[] = [
    'product',
    'unitCost',
    'howMany',
    'total',
    'options',
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  clientOrder: ClientInterface = {
    _id: null,
    address: null,
    name: null,
    status: null,
    timeDelivery: null,
    token: null,
  };
  clientOrderValidate: FormGroup;

  partOrder: OrderProductInterface[] = [];
  partOrderSelect: OrderProductInterface = {
    howMany: 0,
    product: null,
    unitCost: 0,
    total: 0,
  };

  total = 0;
  timeDelivery: Date;
  timeCreate?: Date;
  timeFullDelivery?: Date;
  status?: StatusInterface[];
  statusSelect?: StatusInterface = {};

  reports: ReportInterface[] = [];
  createReport: ReportInterface = {
    _id: null,
    report: [],
    factory: null,
    status: {
      _id: null,
      name: null,
    },
    timeCreate: null,
    user: null,
  };
  formReport: FormGroup;

  dataSourceReportOrder: MatTableDataSource<ReportInterface>;
  displayedColumnsReportOrder: string[] = [
    'status',
    'timeCreate',
    'factory',
    'dateInit',
    'dateFinal',
    'options',
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
  }

  constructor(
    private _DIALOG_SERVICE: DialogService,
    private _ORDER_SERVICE: OrderService,
    private _FORM_BUILDER: FormBuilder,
    private _LOG_SERVICE: LogService,
    private _STATUS_SERVICE: StatusService,
    private _USER_SERVICE: UserService,
    private _SEND_MAIL_SERVICE: EmailService
  ) {}

  ngOnInit() {
    this.getOrder();
    this.getStatus();
    this.getReports();
    this.getPartOrder();
    this.validateClient();
    this.validateReportRequest();
  }

  public validateClient(): void {
    this.clientOrderValidate = this._FORM_BUILDER.group({
      name: ['', Validators.required],
      timeDelivery: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  /* get all orders */
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

  /* get all the status */
  private getStatus(): void {
    try {
      this._STATUS_SERVICE.readStatus().subscribe((value: any[]) => {
        if (value) {
          this.status = value;
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al obtener a los estados de pedido.',
        JSON.stringify(error.name)
      );
    }
  }

  /* register log actions on the system */
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
            user: this._USER_SERVICE.getUser(),
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
        status: this.statusSelect,
        timeCreate: new Date(),
        timeDelivery: new Date(),
        timeFullDelivery: this.addDays(
          this.timeDelivery,
          this.clientOrder.timeDelivery
        ),
        total: this.getTotalCostParts(),
        parts: this.partOrder,
        id: 0
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
            user: this._USER_SERVICE.getUser(),
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
      this.dataSourcePartOrder = new MatTableDataSource<OrderProductInterface>(
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
              total: 0,
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
      .map((t) => t.total)
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
          unitCost: item.unitCost,
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

  private updateState(order: OrderInterface, statusName: string): void {
    try {
      order.status = this.status.filter(
        (status) => status.name === statusName
      )[0];
      this._ORDER_SERVICE.updateSale(order, 'state').subscribe((value: any) => {
        if (value) {
          this.registerAction({
            action: 'update state order parts',
            date: new Date(),
            user: this._USER_SERVICE.getUser(),
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

  wantEditState(item: OrderInterface, status: string): void {
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
            this.updateState(item, status);
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

  onChange(ms: MatSelectChange): void {
    this.createReport.status = ms.value;
  }

  validateReportRequest(): void {
    this.formReport = this._FORM_BUILDER.group({
      status: ['', Validators.required],
      sort: ['', Validators.required],
      dateInit: ['', Validators.required],
      dateFinal: ['', Validators.required],
    });
  }

  public wantReport(): void {
    try {
      console.log(this.formReport.get('status').value);
      this.createReport = {
        _id: null,
        report: null,
        factory: null,
        status: this.formReport.get('status').value,
        timeCreate: new Date(),
        user: this._USER_SERVICE.getUser(),
        dateFinal: this.formReport.get('dateFinal').value,
        dateInit: this.formReport.get('dateInit').value,
        sort: this.formReport.get('sort').value,
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
              user: this._USER_SERVICE.getUser(),
              dateFinal: this.formReport.get('dateFinal').value,
              dateInit: this.formReport.get('dateInit').value,
              sort: this.formReport.get('sort').value,
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
            user: this._USER_SERVICE.getUser(),
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
      this._DIALOG_SERVICE
        .showDelete('Guardar', 'Estas seguro de guardar este reporte', null)
        .beforeClosed()
        .subscribe((value: any) => {
          if (value) {
            this.newReport(this.createReport);
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

  wantSendMail(data: any): void {
    try {
      this._DIALOG_SERVICE.shareData = data;
      this._DIALOG_SERVICE
        .openDialog(SendMailComponent)
        .beforeClosed()
        .subscribe((value: any) => {
          if (value) {
            this.sentMail(value);
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al reenviar el correo.',
        JSON.stringify(error.name)
      );
    }
  }

  private sentMail(mail: EmailInterface): void {
    try {
      this._SEND_MAIL_SERVICE.sendMail(mail).subscribe( (value: any) => {
        if (value.ok) {
          this._DIALOG_SERVICE.showSuccess();
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al reenviar el correo.',
        JSON.stringify(error.name)
      );
    }
  }
}
