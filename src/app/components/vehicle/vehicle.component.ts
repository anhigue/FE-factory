import { Component, OnInit, ViewChild } from '@angular/core';
import { VehicleInterface } from '../../../interfaces/VehicleInterface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder } from '@angular/forms';
import { DialogService } from '../../services/dialog/dialog.service';
import { VehiclesService } from '../../services/vehicles/vehicles.service';
import { DeleteComponent } from '../delete/delete.component';
import { VehicleDialogComponent } from '../vehicle-dialog/vehicle-dialog.component';
import { LogInterface } from '../../../interfaces/LogInterface';
import { LogService } from '../../services/log/log.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {
  vehicles: VehicleInterface[] = [];

  displayedColumns: string[] = [
    'universalCode',
    'brand',
    'line',
    'year',
    'options'
  ];
  dataSource: MatTableDataSource<VehicleInterface>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _FORM_BUILDER: FormBuilder,
    private _DIALOG_SERVICE: DialogService,
    private _VEHICLE_SERVICE: VehiclesService,
    private _LOG_SERVICE: LogService,
    private _USER_SERVICE: UserService
  ) {}

  ngOnInit() {
    this.getVehicle();
  }

  public getVehicle(): void {
    try {
      this._VEHICLE_SERVICE
        .readVehicle()
        .subscribe((value: VehicleInterface[]) => {
          if (value) {
            this.vehicles = value;
            this.dataSource = new MatTableDataSource<VehicleInterface>(
              this.vehicles
            );
            this.dataSource.paginator = this.paginator;
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        null,
        'Error al obtener los vehiculos.',
        JSON.stringify(error.name)
      );
    }
  }

  private registerAction(log: LogInterface): void {
    try {
      this._LOG_SERVICE.newLog(log).subscribe((state: any) => {
        if (state) {
          this._DIALOG_SERVICE.showSuccess();
          this.getVehicle();
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

  public createVehicle(vehicle: VehicleInterface): void {
    try {
      this._VEHICLE_SERVICE.newVehicle(vehicle).subscribe((values: any) => {
        if (values) {
          this.registerAction({
            action: 'create vehicle',
            date: new Date(),
            user: this._USER_SERVICE.getUser()
          });
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al crear un nuevo vehiculo.',
        JSON.stringify(error.name)
      );
    }
  }

  private deleteVehicle(vehicle: VehicleInterface): void {
    try {
      this._VEHICLE_SERVICE.deleteVehicle(vehicle).subscribe((value: any) => {
        if (value) {
          this.registerAction({
            action: 'delete vehicle',
            date: new Date(),
            user: this._USER_SERVICE.getUser()
          });
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al eliminar un vehiculo.',
        JSON.stringify(error.name)
      );
    }
  }
  public updateVehicle(vehicle: VehicleInterface): void {
    try {
      this._VEHICLE_SERVICE.updateVehicle(vehicle).subscribe((value: any) => {
        if (value) {
          this.registerAction({
            action: 'update vehicle',
            date: new Date(),
            user: this._USER_SERVICE.getUser()
          });
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al actualizar un vehiculo.',
        JSON.stringify(error.name)
      );
    }
  }

  wantEdit(vahicle: any) {
    try {
      this._DIALOG_SERVICE.shareData = vahicle;
      this._DIALOG_SERVICE
        .openDialog(VehicleDialogComponent)
        .beforeClosed()
        .subscribe((value: VehicleInterface) => {
          if (value) {
            this.updateVehicle(value);
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al actualizar un vehiculo.',
        JSON.stringify(error.name)
      );
    }
  }

  wantDelete(vehicle: VehicleInterface) {
    try {
      this._DIALOG_SERVICE
        .showDelete(null, 'Estas seguro que quieres eliminar este vehiculo', null)
        .beforeClosed()
        .subscribe((value: any) => {
          if (value) {
            this.deleteVehicle(vehicle);
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al eliminar un vehiculo.',
        JSON.stringify(error.name)
      );
    }
  }

  wantCreate(): void {
    try {
      this._DIALOG_SERVICE.shareData = {};
      this._DIALOG_SERVICE
        .openDialog(VehicleDialogComponent)
        .beforeClosed()
        .subscribe((value: any) => {
          if (value) {
            this.createVehicle(value);
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al crear un nuevo vehiculo.',
        JSON.stringify(error.name)
      );
    }
  }
}
