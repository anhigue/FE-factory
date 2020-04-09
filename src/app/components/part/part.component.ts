import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PartInterface } from '../../../interfaces/PartInterface';
import { DialogService } from '../../services/dialog/dialog.service';
import { PartService } from '../../services/part/part.service';
import { CrudInterface } from '../../utiles/crudInterface';
import { PartDialogComponent } from '../part-dialog/part-dialog.component';
import { VehicleInterface } from '../../../interfaces/VehicleInterface';
import { PartVehicleDialogComponent } from '../part-vehicle-dialog/part-vehicle-dialog.component';
import { ActionReturnInterface } from '../../../interfaces/ActionReturnInterface';
import { LogInterface } from '../../../interfaces/LogInterface';
import { LogService } from '../../services/log/log.service';
import { MatSort } from '@angular/material/sort';
import { VehiclesService } from '../../services/vehicles/vehicles.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.scss'],
})
export class PartComponent implements OnInit, CrudInterface<PartInterface> {
  displayedColumns: string[] = [
    'position',
    'name',
    'description',
    'partNo',
    'price',
    'options',
  ];
  parts: PartInterface[] = [];
  dataSource: MatTableDataSource<PartInterface>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  vehicles: VehicleInterface[] = [];
  vehicleSelected: VehicleInterface;

  constructor(
    private _DIALOG_SERVICE: DialogService,
    private _PART_SERVICE: PartService,
    private _VEHICLE_SERVICE: VehiclesService,
    private _LOG_SERVICE: LogService,
    private _USER_SERVICE: UserService
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
          console.log(this.parts);
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
      this._VEHICLE_SERVICE.readVehicle().subscribe((value: any) => {
        if (value) {
          this.vehicles = value;
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

  private registerAction(log: LogInterface): void {
    try {
      this._LOG_SERVICE.newLog(log).subscribe((state: any) => {
        if (state) {
          this._DIALOG_SERVICE.showSuccess();
          this.getParts();
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

  private createPart(part: PartInterface): void {
    try {
      this._PART_SERVICE.newProduct(part).subscribe((value: any) => {
        if (value) {
          this.registerAction({
            action: 'create part',
            date: new Date(),
            user: this._USER_SERVICE.getUser()
          });
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al crear un nuevo repuesto.',
        JSON.stringify(error.name)
      );
    }
  }

  wantCreate(item?: PartInterface): void {
    try {
      const part: PartInterface = {
        description: '',
        name: '',
        partNo: '',
        price: null,
        vehicles: [],
      };
      this._DIALOG_SERVICE.shareData = part;
      this._DIALOG_SERVICE
        .openDialog(PartDialogComponent)
        .beforeClosed()
        .subscribe((value) => {
          if (value) {
            this.createPart(value);
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al crear un nuevo repuesto.',
        JSON.stringify(error.name)
      );
    }
  }

  private updatePart(part: PartInterface): void {
    try {
      this._PART_SERVICE.updateProduct(part).subscribe((value: any) => {
        if (value) {
          this.registerAction({
            action: 'update part',
            date: new Date(),
            user: this._USER_SERVICE.getUser()
          });
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al actualizar un repuesto.',
        JSON.stringify(error.name)
      );
    }
  }

  wantEdit(item?: PartInterface): void {
    try {
      this._DIALOG_SERVICE.shareData = item;
      this._DIALOG_SERVICE
        .openDialog(PartDialogComponent)
        .beforeClosed()
        .subscribe((value) => {
          if (value) {
            this.updatePart(value);
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al actualizar un repuesto.',
        JSON.stringify(error.name)
      );
    }
  }

  private deletePart(part: PartInterface): void {
    try {
      this._PART_SERVICE.deleteProduct(part).subscribe((value: any) => {
        if (value) {
          this.registerAction({
            action: 'delete part',
            date: new Date(),
            user: this._USER_SERVICE.getUser()
          });
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al eliminar un repuesto.',
        JSON.stringify(error.name)
      );
    }
  }

  wantDelete(item?: PartInterface): void {
    try {
      this._DIALOG_SERVICE
        .showDelete(
          'Eliminar',
          'Estas seguro de que quieres eliminar este repuesto.',
          null
        )
        .beforeClosed()
        .subscribe((value: any) => {
          if (value) {
            this.deletePart(item);
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al eliminar un repuesto.',
        JSON.stringify(error.name)
      );
    }
  }

  wantUpdateVehicles(product: PartInterface) {
    try {
      this._DIALOG_SERVICE.shareData = product;
      this._DIALOG_SERVICE
        .openDialog(PartVehicleDialogComponent)
        .beforeClosed()
        .subscribe((value: ActionReturnInterface) => {
          if (value.type === 'delete') {
            const index = product.vehicles.indexOf(value.data);
            if (index > -1) {
              product.vehicles.splice(index, 1);
              this.assignVehicle(product);
            }
          } else if (value.type === 'assign') {
            product.vehicles.push(value.data);
            this.assignVehicle(product);
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        error,
        'Error',
        'Error al interactuar con los vehiculos del repuesto.'
      );
    }
  }

  private assignVehicle(product: PartInterface) {
    try {
      this._PART_SERVICE
        .assignVehicleProduct(product)
        .subscribe((value: any) => {
          if (value) {
            /* message success here */
            this.registerAction({
              action: 'update part vehicles',
              date: new Date(),
              user: this._USER_SERVICE.getUser()
            });
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        error,
        'Error',
        'Error al asignar un vehiculo al repuesto.'
      );
    }
  }

  applyFilterString(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilterVehicles(event: Event): void {
    if (this.vehicleSelected) {
      const filterValue = JSON.stringify(this.vehicleSelected._id);
      console.log(filterValue.trim().toLowerCase());
      this.dataSource.filter = this.vehicleSelected._id.toLowerCase();
    } else {
      this.dataSource.filter = '';
    }
  }
}
