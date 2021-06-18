import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPageRoutingModule } from './menu-routing.module';

import { MenuPage } from './menu.page';
import { LoginPageModule } from '../login/login.module';
import { LoginPage } from '../login/login.page';

@NgModule({
  entryComponents: [
    LoginPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPageRoutingModule,
    LoginPageModule
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
