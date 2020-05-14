import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../../services/report/report.service';
import {
  ReportStoreInterface,
  RequestReportInterface,
  ReportSaveInterface,
} from '../../../interfaces/ReportStoreInterface';
import { ClientInterface } from '../../../interfaces/ClientInterface';
import { ClientService } from '../../services/client/client.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from '../../services/dialog/dialog.service';
import { EmailService } from '../../services/email/email.service';
import { EmailInterface } from '../../../interfaces/EmailInterface';
import { SendMailComponent } from '../send-mail/send-mail.component';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  reports: ReportStoreInterface[];
  reportsSave: ReportSaveInterface[];

  client: ClientInterface;
  clientSelect: ClientInterface;
  password: string;

  displayedColumns: string[] = [
    'name',
    'description',
    'partNo',
    'salePrice',
    'stock',
  ];

  displayedColumnsReport: string[] = ['position', 'client', 'date', 'option'];

  dataSource: MatTableDataSource<ReportStoreInterface>;
  dataSourceReport: MatTableDataSource<ReportSaveInterface>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  validateRequest: FormGroup;

  constructor(
    private _REPORT_SERVICE: ReportService,
    private _CLIENT_SERVICE: ClientService,
    private _FORM_BUILDER: FormBuilder,
    private _DIALOG_SERVICE: DialogService,
    private _EMAIL_SERVICE: EmailService
  ) {}

  ngOnInit() {
    this.validateForm();
    this.getClients();
    this.getReportSave();
  }

  private getReportSave(): void {
    try {
      this._REPORT_SERVICE.readReportStore().subscribe((value: any) => {
        if (value) {
          this.reportsSave = value;
          this.dataSourceReport = new MatTableDataSource<ReportSaveInterface>(
            this.reportsSave
          );
          /* this.dataSource.paginator = this.paginator; */
          /* this.dataSource.sort = this.sort; */
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  private getClients(): void {
    try {
      this._CLIENT_SERVICE.readClient().subscribe((value: any) => {
        if (value) {
          this.client = value;
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  public getReport() {
    try {
      const req: RequestReportInterface = {
        client: this.clientSelect,
        password: this.password,
      };
      this._REPORT_SERVICE.readReportStoreData(req).subscribe((value: any) => {
        if (value) {
          this.reports = value.data;
          this.dataSource = new MatTableDataSource<ReportStoreInterface>(
            this.reports
          );
          /* this.dataSource.paginator = this.paginator; */
          this.dataSource.sort = this.sort;
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  private validateForm(): void {
    this.validateRequest = this._FORM_BUILDER.group({
      pass: ['', Validators.required],
    });
  }

  changeSelect(event) {
    this.clientSelect = event.value;
  }

  wantSave(): void {
    try {
      this._DIALOG_SERVICE.shareData = this.reports;
      this._DIALOG_SERVICE
        .openDialog(SendMailComponent)
        .beforeClosed()
        .subscribe((value: any) => {
          if (value) {
            this.sentMail(value);
            this._REPORT_SERVICE
              .newReportStore({
                client: this.clientSelect,
                dateConsult: new Date(),
                product: this.reports,
              })
              .subscribe((res: any) => {
                console.log(res);
              });
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  private sentMail(mail: EmailInterface): void {
    try {
      this._EMAIL_SERVICE.sendMail(mail).subscribe((value: any) => {
        if (value.ok) {
          this._DIALOG_SERVICE.showSuccess();
          this.getReportSave();
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
