import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdopcionPageRoutingModule } from './adopcion-routing.module';

import { AdopcionPage } from './adopcion.page';

import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdopcionPageRoutingModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatButtonModule,
    MatInputModule
  ],
  declarations: [AdopcionPage]
})
export class AdopcionPageModule {}
