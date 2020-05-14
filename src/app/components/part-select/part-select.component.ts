import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PartInterface } from '../../../interfaces/PartInterface';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from '../../services/dialog/dialog.service';
import { PartService } from '../../services/part/part.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { VehiclesService } from '../../services/vehicles/vehicles.service';
import { VehicleInterface } from '../../../interfaces/VehicleInterface';
import { ViewProductComponent } from '../view-product/view-product.component';

@Component({
  selector: 'app-part-select',
  templateUrl: './part-select.component.html',
  styleUrls: ['./part-select.component.scss']
})
export class PartSelectComponent implements OnInit {

  cars: VehicleInterface[];

  displayedColumns: string[] = [
    'position',
    'name',
    'description',
    'partNo',
    'image',
    'price',
    'options'
  ];
  parts: PartInterface[] = [];
  dataSource: MatTableDataSource<PartInterface>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<PartSelectComponent>,
    private _DIALOG_SERVICE: DialogService,
    private _PART_SERVICE: PartService,
    private _VEHICLE_SERVICE: VehiclesService
  ) {}

  ngOnInit() {
    this.getParts();
    this.getVehicles();
  }

  private getParts(): void {
    try {
      this._PART_SERVICE.readProduct().subscribe((value: any) => {
        if (value) {
          this.parts = value;
          this.dataSource = new MatTableDataSource<PartInterface>(this.parts);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al obtener los repuestos',
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

  applyFilterNameValuePrice(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyDataFilter(data: PartInterface[]) {
    this.dataSource = new MatTableDataSource<PartInterface>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilterVehicle(event: any) {
    try {
      if (event.value != null) {
        let partFound: any[] = [];

        this.parts.forEach((part: PartInterface) => {
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
        this.getParts();
      }
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al filtrar por vehiculo',
        JSON.stringify(error.name)
      );
    }
  }

  viewImagePart(data: PartInterface): void {
    try {
      this._DIALOG_SERVICE.width = '';
      this._DIALOG_SERVICE.shareData = data;
      this._DIALOG_SERVICE.openDialog(ViewProductComponent);
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al mostrar la imagen',
        JSON.stringify(error.name)
      );
    }
  }
}
