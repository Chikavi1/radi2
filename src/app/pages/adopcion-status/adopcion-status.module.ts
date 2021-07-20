import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdopcionStatusPageRoutingModule } from './adopcion-status-routing.module';

import { AdopcionStatusPage } from './adopcion-status.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdopcionStatusPageRoutingModule
  ],
  declarations: [AdopcionStatusPage]
})
export class AdopcionStatusPageModule {}
