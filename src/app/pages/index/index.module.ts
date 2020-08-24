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

@NgModule({
  entryComponents: [
    LoginPage,
    ProfilePage,
    RegisterPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IndexPageRoutingModule,
    LoginPageModule,
    ProfilePageModule,
    RegisterPageModule,
    LottieAnimationViewModule.forRoot()
  ],
  declarations: [IndexPage]
})
export class IndexPageModule {}
