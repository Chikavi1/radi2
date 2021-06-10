import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarReservationPageRoutingModule } from './calendar-reservation-routing.module';

import { CalendarReservationPage } from './calendar-reservation.page';
import {CalendarModule} from "ion2-calendar";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarModule,
    CalendarReservationPageRoutingModule
  ],
  declarations: [CalendarReservationPage]
})
export class CalendarReservationPageModule {}
