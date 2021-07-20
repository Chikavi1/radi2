import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdopcionStatusPage } from './adopcion-status.page';

const routes: Routes = [
  {
    path: '',
    component: AdopcionStatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdopcionStatusPageRoutingModule {}
