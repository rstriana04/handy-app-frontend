import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'handy-app-service-report',
  templateUrl: './service-report.component.html',
  styleUrls: ['./service-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceReportComponent implements OnInit {
  @ViewChild('picker') picker: any;

  public date: moment.Moment;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public minDate: moment.Moment;
  public maxDate: moment.Moment = moment(new Date());
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';
  constructor() { }

  ngOnInit(): void {
  }


  getCurrentDate(): string {
    return new Date().toString();
  }

}
