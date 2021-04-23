import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { addDays, differenceInDays, format, getDay, getMonth, getWeek } from 'date-fns';
import { ThemePalette } from '@angular/material/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceReport } from './models/service-report';
import { ServiceReportService } from './services/service-report.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'handy-app-service-report',
  templateUrl: './service-report.component.html',
  styleUrls: ['./service-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceReportComponent implements OnInit {
  @ViewChild('picker') picker: any;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = true;
  public touchUi = true;
  public enableMeridian = true;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';

  formServiceReport: FormGroup;

  constructor(
    private serviceReportService: ServiceReportService,
    private matSnackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.initFormServiceReport();
  }


  getCurrentDate(): string {
    return new Date().toString();
  }

  private initFormServiceReport(): void {
    this.formServiceReport = new FormGroup({
      dateFrom: new FormControl('', Validators.required),
      dateUntil: new FormControl('', Validators.required),
      serviceIdentification: new FormControl('', Validators.required),
      staffIdentification: new FormControl('', Validators.required),
    });
  }

  public sendFormServiceReport(formServiceReport: FormGroup): void {
    if (formServiceReport && formServiceReport.valid) {
      const daysServiceReports: ServiceReport[] = [];
      const serviceReport: ServiceReport = {...formServiceReport.value};

      const dateFrom = new Date(serviceReport.dateFrom);
      const dateUntil = new Date(serviceReport.dateUntil);


      const diffInDays = differenceInDays(dateUntil, dateFrom);
      const hourFrom = format(dateFrom, 'HH:mm:ss');
      const hourUntil = format(dateUntil, 'HH:mm:ss');

      for (let i = 0; i <= diffInDays; i++) {
        daysServiceReports.push({
          dateFrom: format(addDays(dateFrom, i ), 'yyyy-MM-dd'),
          dateUntil: format(addDays(dateFrom, i ), 'yyyy-MM-dd'),
          serviceIdentification: serviceReport.serviceIdentification,
          staffIdentification: serviceReport.staffIdentification,
          week: getWeek(addDays(dateFrom, i )),
          hourFrom,
          hourUntil,
        });
      }
      if (daysServiceReports && daysServiceReports.length) {
        this.serviceReportService.createServiceReports(daysServiceReports).subscribe(() => {
          this.formServiceReport.reset();
          this.matSnackBar.open('¡Servicio reportado correctamente!', 'Cerrar', {duration: 4000});
        }, error => {
          console.error(error);
          this.matSnackBar.open('¡Ocurrió un error inesperado!', 'Cerrar', {duration: 4000});
        });
      }
    }
  }
}
