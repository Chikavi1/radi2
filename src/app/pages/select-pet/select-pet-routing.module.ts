import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectPetPage } from './select-pet.page';

const routes: Routes = [
  {
    path: '',
    component: SelectPetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectPetPageRoutingModule {}
