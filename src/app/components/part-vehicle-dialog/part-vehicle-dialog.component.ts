import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { VehicleInterface } from '../../../interfaces/VehicleInterface';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActionReturnInterface } from '../../../interfaces/ActionReturnInterface';
import { PartInterface } from '../../../interfaces/PartInterface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogService } from '../../services/dialog/dialog.service';
import { VehiclesService } from '../../services/vehicles/vehicles.service';

@Component({
  selector: 'app-part-vehicle-dialog',
  templateUrl: './part-vehicle-dialog.component.html',
  styleUrls: ['./part-vehicle-dialog.component.scss']
})
export class PartVehicleDialogComponent implements OnInit {
  public partUpdate: ActionReturnInterface;
  formGroupProduct: FormGroup;

  displayedColumns: string[] = [
    'universalCode',
    'brand',
    'line',
    'year',
    'options'
  ];

  vehicles: VehicleInterface[] = [];
  vehicleProducts: VehicleInterface[] = [];
  dataSource: MatTableDataSource<VehicleInterface>;
  vehicleSelect: VehicleInterface;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public dialogRef: MatDialogRef<PartVehicleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PartInterface,
    private _FORM_BUILDER: FormBuilder,
    private _DIALOG_SERVICE: DialogService,
    private _VEHICLE_SERVICE: VehiclesService
  ) {}

  ngOnInit() {
    this.validateActions();
    this.getVehicles();
    this.setVehiclesProduct();
  }

  validateActions(): void  {
    this.formGroupProduct = this._FORM_BUILDER.group({
      vehicle: ['', Validators.required],
    });
  }

  private getVehicles() {
    try {
      this._VEHICLE_SERVICE.readVehicle().subscribe( (value: VehicleInterface[]) => {
        if (value) {
          this.vehicles = value;
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  public setVehiclesProduct() {
    try {
      this.vehicleProducts = this.data.vehicles;
      this.dataSource = new MatTableDataSource<VehicleInterface>(this.vehicleProducts);
      this.dataSource.paginator = this.paginator;
    } catch (error) {
      this._DIALOG_SERVICE.showError(error, 'Error', 'Error al cargar los vehiculos del repuesto.');
    }
  }

  public setDataReturn(type: string, data: any): ActionReturnInterface {
    try {
      this.partUpdate = {
        type,
        data
      };
      return this.partUpdate;
    } catch (error) {
      this._DIALOG_SERVICE.showError(error, 'Error', 'Error interno de procesamiento.');
      console.log(error);
    }
  }

}
