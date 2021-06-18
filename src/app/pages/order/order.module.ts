import { NgModule,LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderPageRoutingModule } from './order-routing.module';

import { OrderPage } from './order.page';
import { ModalComponent } from 'src/app/modal/modal.component';
import localeEsAr from '@angular/common/locales/es-AR';
import { registerLocaleData } from '@angular/common';
import { CardPage } from '../card/card.page';
import { CardPageModule } from '../card/card.module';
import { PaymentsPage } from '../payments/payments.page';
import { PaymentsPageModule } from '../payments/payments.module';


registerLocaleData(localeEsAr, 'es-Ar');
@NgModule({
  providers: [ { provide: LOCALE_ID, useValue: 'es-Ar' } ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderPageRoutingModule,
    CardPageModule,
    PaymentsPageModule
  ],
  declarations: [OrderPage,ModalComponent],
  entryComponents: [
    ModalComponent,
    CardPage,
    PaymentsPage
  ],
})
export class OrderPageModule {}
