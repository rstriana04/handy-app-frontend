import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceReport } from '../models/service-report';
import { environment } from '../../../../environments/environment';
import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ServiceReportService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  getReportServiceByStaffAndWeek(staffIdentification: string, week: number): Observable<ServiceReport[]> {
    return this.httpClient.get<ServiceReport[]>(`${environment.apiUrl}/service-report/${staffIdentification}/${week}`, {
      observe: 'response',
      responseType: 'json',
    }).pipe(
      pluck('body'),
    );
  }

  createServiceReports(serviceReports: ServiceReport[]): Observable<ServiceReport[]> {
    return this.httpClient.post<ServiceReport[]>(`${environment.apiUrl}/service-report`, serviceReports, {
      observe: 'response',
      responseType: 'json',
    }).pipe(
      pluck('body'),
    );
  }


}
