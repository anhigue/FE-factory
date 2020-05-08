import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogService } from '../../../services/dialog/dialog.service';
import { ReportService } from '../../../services/report/report.service';
import { ReportStoreInterface } from '../../../../interfaces/ReportStoreInterface';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { VehicleInterface } from '../../../../interfaces/VehicleInterface';
import { VehiclesService } from '../../../services/vehicles/vehicles.service';

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
  displayedColumns: string[] = ['client', 'name', 'description', 'partNo', 'price', 'stock', 'dateSale'];
  dataSource: MatTableDataSource<ReportStoreInterface>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private _DIALOG_SERVICE: DialogService,
    private _REPORT_SERVICE: ReportService,
    private _VEHICLE_SERVICE: VehiclesService
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
            this.dataSource = new MatTableDataSource<ReportStoreInterface>(this.productSale);
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
        let partFound: any[] = [];

        this.productSale.forEach((part: ReportStoreInterface) => {
          let found = [];
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
}
