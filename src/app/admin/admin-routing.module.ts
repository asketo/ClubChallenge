import { NgModule } from '@angular/core';
import { CanActivate, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AuthGuard } from '../auth-guard.service';

const adminRoutes = [
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: AdminComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {

}
