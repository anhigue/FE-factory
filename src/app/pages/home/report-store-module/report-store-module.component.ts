import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogService } from '../../../services/dialog/dialog.service';
import { ReportService } from '../../../services/report/report.service';
import { ReportStoreInterface } from '../../../../interfaces/ReportStoreInterface';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { VehicleInterface } from '../../../../interfaces/VehicleInterface';
import { VehiclesService } from '../../../services/vehicles/vehicles.service';
import { SendMailComponent } from '../../../components/send-mail/send-mail.component';
import { EmailInterface } from '../../../../interfaces/EmailInterface';
import { EmailService } from '../../../services/email/email.service';
import { ExcelDataInterface } from '../../../../interfaces/ExcelDataInterface';

@Component({
  selector: 'app-report-store-module',
  templateUrl: './report-store-module.component.html',
  styleUrls: ['./report-store-module.component.scss'],
})
export class ReportStoreModuleComponent implements OnInit {
  /* data */
  productSale: ReportStoreInterface[] = [];
  cars: VehicleInterface[] = [];

  /* table components */
  displayedColumns: string[] = [
    'client',
    'name',
    'description',
    'partNo',
    'price',
    'stock',
    'dateSale',
  ];
  dataSource: MatTableDataSource<ReportStoreInterface>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  /* filter components */
  public startDate: Date;
  public endDate: Date;

  constructor(
    private _DIALOG_SERVICE: DialogService,
    private _REPORT_SERVICE: ReportService,
    private _VEHICLE_SERVICE: VehiclesService,
    private _SEND_MAIL_SERVICE: EmailService
  ) {}

  ngOnInit() {
    this.getReport();
    this.getVehicles();
  }

  private getReport(): void {
    try {
      this._REPORT_SERVICE
        .readReportStore()
        .subscribe((value: ReportStoreInterface[]) => {
          if (value) {
            this.productSale = value;
            this.dataSource = new MatTableDataSource<ReportStoreInterface>(
              this.productSale
            );
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al obtener los productos vendidos',
        JSON.stringify(error.name)
      );
    }
  }

  private getVehicles(): void {
    try {
      this._VEHICLE_SERVICE
        .readVehicle()
        .subscribe((value: VehicleInterface[]) => {
          if (value) {
            this.cars = value;
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al obtener los vehiculos',
        JSON.stringify(error.name)
      );
    }
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private applyDataFilter(data: ReportStoreInterface[]) {
    this.dataSource = new MatTableDataSource<ReportStoreInterface>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilterVehicle(event: any) {
    try {
      if (event.value != null) {
        const partFound: any[] = [];

        this.productSale.forEach((part: ReportStoreInterface) => {
          const found = [];
          part.vehicles.forEach((vehicle) => {
            if (vehicle.universalCode === event.value.universalCode) {
              found.push(vehicle);
            }
          });

          if (found.length > 0) {
            partFound.push(part);
          }
        });

        this.applyDataFilter(partFound);
      } else {
        this.getReport();
      }
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al filtrar por vehiculo',
        JSON.stringify(error.name)
      );
    }
  }

  convertDataToExcelReport(
    product: ReportStoreInterface[]
  ): ExcelDataInterface[] {
    try {
      const data: any[] = [];

      product.forEach((element) => {
        data.push([
          element.client.name,
          element.dateSale.toString().split('T')[0],
          element.description,
          element.name,
          element.partNo,
          element.price.toString(),
          element.salePrice.toString(),
          element.stock.toString(),
          element.valueWithoutIVA.toString(),
        ]);
      });
      return data;
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al convertir los datos en formato excel',
        JSON.stringify(error.name)
      );
    }
  }

  wantSendMail(): void {
    try {
      const data = this.convertDataToExcelReport(this.productSale);
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
      this._SEND_MAIL_SERVICE.sendMail(mail).subscribe((value: any) => {
        console.log(value);
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

  filterByDate(): void {
    try {
      const startDate = new Date(this.startDate);
      const endDate = new Date(this.endDate);

      const resultProductData = this.productSale.filter( (a) => {
          const hitDates = new Date(a.dateSale);
          // filter this dates by startDate and endDate
          if ( hitDates >= startDate && hitDates <= endDate ) {
            return a;
          }
      });

      if (resultProductData.length > 0 ) {
        this.productSale = resultProductData;
      } else {
        this._DIALOG_SERVICE.showError(
          'Advertencia',
          'No hay productos vendidos dentro de ese rango de fecha',
          null
        );
      }
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al reenviar el correo.',
        JSON.stringify(error.name)
      );
    }
  }
}
