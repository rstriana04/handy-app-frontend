import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingHoursComponent } from './working-hours.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ServiceReport } from '../service-report/models/service-report';

describe('WorkingHoursComponent', () => {
  let component: WorkingHoursComponent;
  let fixture: ComponentFixture<WorkingHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkingHoursComponent],
      imports: [HttpClientModule, MatSnackBarModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkingHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('The method isUsualHours should return a boolean', () => {
    expect(typeof component.isUsualHours([0, 1, 2, 3, 4, 5])).toEqual('boolean');
  });

  it('The method sumTotalHoursByDays should return a number', () => {
    const days: ServiceReport[] = [
      {
        dateFrom: '2021-04-27 18:00:00',
        dateUntil: '2021-04-27 22:00:00',
        serviceIdentification: '123456',
        staffIdentification: '1112793743',
        week: 18
      },
    ];
    expect(typeof component.sumTotalHoursByDays(days)).toEqual('number');
  });
});
