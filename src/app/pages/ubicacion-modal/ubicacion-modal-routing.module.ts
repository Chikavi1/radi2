import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UbicacionModalPage } from './ubicacion-modal.page';

const routes: Routes = [
  {
    path: '',
    component: UbicacionModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UbicacionModalPageRoutingModule {}
