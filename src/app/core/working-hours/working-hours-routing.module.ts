import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkingHoursComponent } from './working-hours.component';

const routes: Routes = [
  {path: '', component: WorkingHoursComponent, children: []},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkingHoursRoutingModule {
}
