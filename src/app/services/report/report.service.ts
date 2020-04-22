import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReportStoreInterface, RequestReportInterface, ReportSaveInterface } from '../../../interfaces/ReportStoreInterface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private headers: HttpHeaders;

  constructor(
    private http: HttpClient,
  ) {
    this.headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8HttpClient');
  }

  readReportStore(): Observable<ReportStoreInterface[]> {
    return this.http.get<ReportStoreInterface[]>(environment.API_BASE + '/report/store', { headers: this.headers});
  }

  readReportStoreData(req: RequestReportInterface): Observable<ReportStoreInterface> {
    return this.http.post<ReportStoreInterface>(environment.API_BASE + '/store/report/', req, { headers: this.headers});
  }

  newReportStore(report: ReportSaveInterface): Observable<any> {
    return this.http.post<any>(environment.API_BASE + '/report/store', report, { headers: this.headers});
  }
}
