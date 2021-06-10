import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePetPageRoutingModule } from './create-pet-routing.module';

import { CreatePetPage } from './create-pet.page';

import { ImageCropperModule }  from 'ngx-image-cropper';
import { IonicSelectableModule } from 'ionic-selectable';
import { LottieAnimationViewModule } from 'ng-lottie';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatePetPageRoutingModule,
    ImageCropperModule,
    IonicSelectableModule,
    LottieAnimationViewModule.forRoot()

  ],
  declarations: [CreatePetPage]
})
export class CreatePetPageModule {}
