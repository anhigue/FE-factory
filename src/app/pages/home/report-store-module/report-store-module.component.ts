import { Component, OnInit } from '@angular/core';
import { DialogService } from '../../../services/dialog/dialog.service';
import { ReportService } from '../../../services/report/report.service';
import { ReportStoreInterface } from '../../../../interfaces/ReportStoreInterface';

@Component({
  selector: 'app-report-store-module',
  templateUrl: './report-store-module.component.html',
  styleUrls: ['./report-store-module.component.scss'],
})
export class ReportStoreModuleComponent implements OnInit {

  productSale: ReportStoreInterface[] = [];

  constructor(
    private _DIALOG_SERVICE: DialogService,
    private _REPORT_SERVICE: ReportService
  ) {}

  ngOnInit() {
    this.getReport();
  }

  private getReport(): void {
    try {
      this._REPORT_SERVICE
        .readReportStore()
        .subscribe((value: ReportStoreInterface[]) => {
          if (value) {
            this.productSale = value;
            console.log(this.productSale);
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
}
