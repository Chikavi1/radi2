import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VeterinariansPageRoutingModule } from './veterinarians-routing.module';

import { VeterinariansPage } from './veterinarians.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VeterinariansPageRoutingModule
  ],
  declarations: [VeterinariansPage]
})
export class VeterinariansPageModule {}
