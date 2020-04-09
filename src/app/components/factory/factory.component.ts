import { Component, OnInit, ViewChild } from '@angular/core';
import { FactoryInterface } from '../../../interfaces/FactoryInterface';
import { DialogCustomComponent } from '../dialog-custom/dialog-custom.component';
import { FactoryDialogComponent } from '../factory-dialog/factory-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DialogService } from '../../services/dialog/dialog.service';
import { FactoryService } from '../../services/factory/factory.service';
import { LogInterface } from '../../../interfaces/LogInterface';
import { LogService } from '../../services/log/log.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-factory',
  templateUrl: './factory.component.html',
  styleUrls: ['./factory.component.scss']
})
export class FactoryComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'name',
    'ip',
    'options'
  ];
  factory: FactoryInterface[] = [];
  dataSource: MatTableDataSource<FactoryInterface>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _DIALOG_SERVICE: DialogService,
    private _FACTORY_SERVICE: FactoryService,
    private _LOG_SERVICE: LogService,
    private _USER_SERVICE: UserService
  ) {}

  ngOnInit() {
    this.getFactory();
  }

  private getFactory(): void {
    try {
      /* descomenta estas lineas cuando termines de agregar las rutas */
      this._FACTORY_SERVICE
        .readFactory()
        .subscribe((value: FactoryInterface[]) => {
          if (value) {
            this.factory = value;
            this.dataSource = new MatTableDataSource<FactoryInterface>(
              this.factory
            );
            this.dataSource.paginator = this.paginator;
          }
        },
        (err: any) => {
          if (err) {
            this._DIALOG_SERVICE.showError('Error', 'Error en la peticion', null);
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        error,
        'Error',
        'Error al obtener las fabricas de repuestos.'
      );
    }
  }

  private registerAction(log: LogInterface): void {
    try {
      this._LOG_SERVICE.newLog(log).subscribe((state: any) => {
        if (state) {
          this._DIALOG_SERVICE.showSuccess();
          this.getFactory();
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

  public wantCreate() {
    try {
      this._DIALOG_SERVICE.shareData = {};
      this._DIALOG_SERVICE
        .openDialog(FactoryDialogComponent)
        .beforeClosed()
        .subscribe((value: FactoryInterface) => {
          if (value) {
            this.createFactory(value);
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        error,
        'Error',
        'Error al crear una fabrica.'
      );
    }
  }

  private createFactory(factory: FactoryInterface) {
    try {
      this._FACTORY_SERVICE.newFactory(factory).subscribe((value: any) => {
        if (value) {
          this.registerAction({
            action: 'create factory',
            date: new Date(),
            user: this._USER_SERVICE.getUser()
          });
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        error,
        'Error',
        'Error al crear una fabrica.'
      );
    }
  }

  wantUpdate(factory: FactoryInterface) {
    try {
      this._DIALOG_SERVICE.shareData = factory;
      this._DIALOG_SERVICE
        .openDialog(FactoryDialogComponent)
        .beforeClosed()
        .subscribe((value: FactoryInterface) => {
          if (value) {
            this.updateFactory(value);
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        error,
        'Error',
        'Error al actualizar una fabrica.'
      );
    }
  }

  private updateFactory(factory: FactoryInterface) {
    try {
      this._FACTORY_SERVICE.updateFactory(factory).subscribe((value: any) => {
        if (value) {
          this.registerAction({
            action: 'update factory',
            date: new Date(),
            user: this._USER_SERVICE.getUser()
          });
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        error,
        'Error',
        'Error al actualizar una fabrica.'
      );
    }
  }

  wantDelete(factory: FactoryInterface) {
    try {
      this._DIALOG_SERVICE.shareData = {
        title: 'Eliminar una Fabrica',
        message: 'Estas seguro que quieres eliminar esta fabrica.',
        data: {}
      };
      this._DIALOG_SERVICE
        .showDelete('Eliminar', 'Estas seguro de que quieres eliminar esata fabrica.', null)
        .beforeClosed()
        .subscribe((value: any) => {
          if (value) {
            this.deleteFactory(factory);
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        error,
        'Error',
        'Error al eliminar una fabrica.'
      );
    }
  }

  private deleteFactory(factory: FactoryInterface) {
    try {
      this._FACTORY_SERVICE.deleteFactory(factory).subscribe((value: any) => {
        if (value) {
          this.registerAction({
            action: 'delete factory',
            date: new Date(),
            user: this._USER_SERVICE.getUser()
          });
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        error,
        'Error',
        'Error al eliminar una fabrica.'
      );
    }
  }
}
