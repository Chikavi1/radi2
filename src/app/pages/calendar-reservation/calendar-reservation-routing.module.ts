import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarReservationPage } from './calendar-reservation.page';

const routes: Routes = [
  {
    path: '',
    component: CalendarReservationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarReservationPageRoutingModule {}
