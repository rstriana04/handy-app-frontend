import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceReportService } from '../service-report/services/service-report.service';
import { differenceInMinutes, format, getDay } from 'date-fns';
import { map } from 'rxjs/operators';
import { ServiceReport } from '../service-report/models/service-report';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'handy-app-working-hours',
  templateUrl: './working-hours.component.html',
  styleUrls: ['./working-hours.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkingHoursComponent implements OnInit {
  formSearchWorkingHours: FormGroup;

  single$: Observable<any> = of([]);
  multi: any[];

  view: any[] = [700, 400];

  // options Ngx Charts
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Tipo de horas';
  showYAxisLabel = true;
  yAxisLabel = 'Cantidad de horas';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

  constructor(
    private serviceReportService: ServiceReportService,
    private matSnackBar: MatSnackBar,
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
      this.single$ = this.serviceReportService.getReportServiceByStaffAndWeek(params.staffIdentification, params.week).pipe(
        map(records => {
          if (records && records.length) {
            return records.map(record => {
              return {
                ...record,
                totalHours: differenceInMinutes(new Date(record.dateUntil), new Date(record.dateFrom)) / 60,
                days: [getDay(new Date(record.dateFrom)), getDay(new Date(record.dateUntil))],
              };
            });
          } else {
            this.matSnackBar.open(`¡No se encontraron registros para la semana número ${params.week}!`, 'Cerrar', {duration: 3000});
            return [];
          }
        }),
        map(records => {
          if (records && records.length) {
            const usualHoursDays = records.filter(record => {
              const days = record.days;
              const hourFrom = format(new Date(record.dateFrom), 'HH:mm:ss');
              const hourUntil = format(new Date(record.dateUntil), 'HH:mm:ss');
              return this.isUsualHours(days) && ((hourFrom >= '07:00:00' && hourFrom <= '20:00:00') && hourUntil <= '20:00:00');
            });

            const usualHours = {
              name: `Hora normales`,
              value: this.sumTotalHoursByDays(usualHoursDays),
            };

            const nightHoursDays = records.filter(record => {
              const days = record.days;
              const hourFrom = format(new Date(record.dateFrom), 'HH:mm:ss');
              const hourUntil = format(new Date(record.dateUntil), 'HH:mm:ss');
              return this.isUsualHours(days) && (hourFrom >= '20:00:00' && hourUntil <= '07:00:00');
            });

            const nightHours = {
              name: `Horas nocturnas`,
              value: this.sumTotalHoursByDays(nightHoursDays),
            };

            const sundayHoursDays = records.filter(record => {
              return record.days.includes(0);
            });

            const sundayHours = {
              name: `Horas Dominicales`,
              value: this.sumTotalHoursByDays(sundayHoursDays),
            };

            const totalHoursInWeek = usualHours.value + nightHours.value + sundayHours.value;
            const usualHoursExtra = {
              name: `Horas Normales Extra`,
              value: totalHoursInWeek >= 48 ? (usualHours.value >= 48 ? usualHours.value - 48 : 48 - usualHours.value) : 0,
            };

            const nightHoursExtra = {
              name: `Horas Nocturnas Extra`,
              value: totalHoursInWeek >= 48 ? (nightHours.value >= 48 ? nightHours.value - 48 : 48 - nightHours.value) : 0,
            };

            const sundayHoursExtra = {
              name: `Horas Dominicales Extra`,
              value: totalHoursInWeek >= 48 ? (sundayHours.value >= 48 ? sundayHours.value - 48 : 48 - sundayHours.value) : 0,
            };
            return [usualHours, nightHours, sundayHours, usualHoursExtra, nightHoursExtra, sundayHoursExtra];
          }
        }),
      );
    }
  }

  isUsualHours(days: number[]): boolean {
    return days.includes(1) || days.includes(2) || days.includes(3) || days.includes(4) || days.includes(5) || days.includes(6);
  }

  sumTotalHoursByDays(days: ServiceReport[]): number {
    return days.reduce((sum, value) => (sum + (value.totalHours ? value.totalHours : 0)), 0);
  }
}
