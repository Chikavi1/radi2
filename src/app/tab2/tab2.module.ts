import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { SearchModalPage } from '../pages/search-modal/search-modal.page';
import { SearchModalPageModule } from '../pages/search-modal/search-modal.module';




@NgModule({
  entryComponents: [
    SearchModalPage
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab2PageRoutingModule,
    SearchModalPageModule
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
