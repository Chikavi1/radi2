import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IndexPageRoutingModule } from './index-routing.module';

import { IndexPage } from './index.page';

import { LoginPage } from '../login/login.page';
import { LoginPageModule } from '../login/login.module';

import { ProfilePage } from '../profile/profile.page';
import { ProfilePageModule } from '../profile/profile.module';

import { RegisterPage } from '../register/register.page';
import { RegisterPageModule } from '../register/register.module';


import { LottieAnimationViewModule } from 'ng-lottie';
import { UbicacionModalPage } from '../ubicacion-modal/ubicacion-modal.page';
import { UbicacionModalPageModule } from '../ubicacion-modal/ubicacion-modal.module';
import { ServiceModalPageModule } from '../service-modal/service-modal.module';
import { ServiceModalPage } from '../service-modal/service-modal.page';

@NgModule({
  entryComponents: [
    LoginPage,
    ProfilePage,
    RegisterPage,
    UbicacionModalPage,
    ServiceModalPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IndexPageRoutingModule,
    LoginPageModule,
    ProfilePageModule,
    RegisterPageModule,
    UbicacionModalPageModule,
    ServiceModalPageModule,
    LottieAnimationViewModule.forRoot()
  ],
  declarations: [IndexPage,UbicacionModalPage]
})
export class IndexPageModule {}
