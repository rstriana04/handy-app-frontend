import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'handy-app-working-hours',
  templateUrl: './working-hours.component.html',
  styleUrls: ['./working-hours.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkingHoursComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
