import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'index',
        loadChildren: () => import('../pages/index/index.module').then(m => m.IndexPageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'tab4',
        loadChildren: () => import('../pages/menu/menu.module').then(m => m.MenuPageModule)
      },
      {
        path: 'tabBlog',
        loadChildren: () => import('../pages/blog/blog.module').then(m => m.BlogPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../pages/profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'reservation',
        loadChildren: () => import('../pages/reservation/reservation.module').then( m => m.ReservationPageModule)
      },
      {
        path: 'ubicacion-modal',
        loadChildren: () => import('../pages/ubicacion-modal/ubicacion-modal.module').then( m => m.UbicacionModalPageModule)
      },
      {
        path: 'reservations',
        loadChildren: () => import('../pages/reservations/reservations.module').then( m => m.ReservationsPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/index',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/index',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
