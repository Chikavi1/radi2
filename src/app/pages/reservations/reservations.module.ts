import { NgModule,LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservationsPageRoutingModule } from './reservations-routing.module';

import { ReservationsPage } from './reservations.page';
import localeEsAr from '@angular/common/locales/es-AR';
import { registerLocaleData } from '@angular/common';


registerLocaleData(localeEsAr, 'es-Ar');

@NgModule({
  providers: [ { provide: LOCALE_ID, useValue: 'es-Ar' } ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservationsPageRoutingModule
  ],
  declarations: [ReservationsPage]
})
export class ReservationsPageModule {}
