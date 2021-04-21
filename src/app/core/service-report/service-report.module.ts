import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceReportRoutingModule } from './service-report-routing.module';
import { ServiceReportComponent } from './service-report.component';
import { SharedModule } from '../../shared/shared.module';
import { NgxMatDatetimePickerModule } from '@angular-material-components/datetime-picker';


@NgModule({
  declarations: [
    ServiceReportComponent
  ],
  imports: [
    CommonModule,
    ServiceReportRoutingModule,
    SharedModule,
    NgxMatDatetimePickerModule,
  ],
})
export class ServiceReportModule { }
