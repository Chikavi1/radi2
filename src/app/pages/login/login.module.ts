import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';
import { LottieAnimationViewModule } from 'ng-lottie';
import { RegisterPageModule } from '../register/register.module';
import { RegisterPage } from '../register/register.page';
import { ForgotPassPage } from '../forgot-pass/forgot-pass.page';
import { ForgotPassPageModule } from '../forgot-pass/forgot-pass.module';
import { AngularFireAuthModule } from '@angular/fire/auth';



@NgModule({
  entryComponents: [
    RegisterPage,
    ForgotPassPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    LottieAnimationViewModule,
    RegisterPageModule,
    ForgotPassPageModule,
    AngularFireAuthModule

  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
