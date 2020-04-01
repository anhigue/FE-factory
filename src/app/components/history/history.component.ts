import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { LogInterface } from '../../../interfaces/LogInterface';
import { MatTableDataSource } from '@angular/material/table';
import { LogService } from '../../services/log/log.service';
import { DialogService } from '../../services/dialog/dialog.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  logs: LogInterface[] = [];
  dataSource: MatTableDataSource<LogInterface>;
  displayedColumns: string[] = [
    'date',
    'action',
    'user',
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private _DIALOG_SERVIE: DialogService,
    private _LOG_SERVICE: LogService,
  ) { }

  ngOnInit() {
    this.getLog();
  }

  private getLog(): void {
    try {
      this._LOG_SERVICE.readLog().subscribe((value: any[]) => {
        if (value) {
          this.logs = value;
          this.dataSource = new MatTableDataSource<LogInterface>(
            this.logs
          );
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
    } catch (error) {
      this._DIALOG_SERVIE.showError(
        'Error',
        'Error al obtener a los logs.',
        JSON.stringify(error.name)
      );
    }
  }

}
