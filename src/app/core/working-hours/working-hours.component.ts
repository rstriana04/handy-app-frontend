import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceReportService } from '../service-report/services/service-report.service';

@Component({
  selector: 'handy-app-working-hours',
  templateUrl: './working-hours.component.html',
  styleUrls: ['./working-hours.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkingHoursComponent implements OnInit {
  formSearchWorkingHours: FormGroup;

  constructor(
    private serviceReportService: ServiceReportService
  ) {
  }

  ngOnInit(): void {
    this.initFormSearchWorkingHours();
  }

  private initFormSearchWorkingHours(): void {
    this.formSearchWorkingHours = new FormGroup({
      staffIdentification: new FormControl('', Validators.required),
      week: new FormControl('', Validators.required),
    });
  }

  public sendFormSearchWorkingHours(formSearchWorkingHours: FormGroup): void {
    if (formSearchWorkingHours.valid) {
      const params = {...formSearchWorkingHours.value};
      this.serviceReportService.getReportServiceByStaffAndWeek(params.staffIdentification, params.week).subscribe(records => {
        console.log(records);
      }, error => {
        console.error(error);
      })
    }
  }
}
