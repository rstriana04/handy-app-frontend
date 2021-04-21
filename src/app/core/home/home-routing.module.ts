import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      {path: 'report-service', loadChildren: () => import('../service-report/service-report.module').then(m => m.ServiceReportModule)},
      {path: 'working-hours', loadChildren: () => import('../working-hours/working-hours.module').then(m => m.WorkingHoursModule)},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {
}
