import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkingHoursRoutingModule } from './working-hours-routing.module';
import { WorkingHoursComponent } from './working-hours.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  declarations: [
    WorkingHoursComponent,
  ],
  imports: [
    CommonModule,
    WorkingHoursRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgxChartsModule,
  ],
})
export class WorkingHoursModule {
}
