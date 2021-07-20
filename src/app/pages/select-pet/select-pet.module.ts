import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectPetPageRoutingModule } from './select-pet-routing.module';

import { SelectPetPage } from './select-pet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectPetPageRoutingModule
  ],
  declarations: [SelectPetPage]
})
export class SelectPetPageModule {}
