import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlayerComponent } from './player.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { PlayerEditComponent } from './player-edit/player-edit.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';

const playersRoutes = [
  {path: '', component: PlayerComponent, children: [
    {path: '', component: PlayerListComponent, pathMatch: 'full'},
    {path: 'detail', component: PlayerDetailComponent},
    {path: 'edit', component: PlayerEditComponent},
    {path: 'list', component: PlayerListComponent}
  ]}
]

@NgModule({
  imports: [RouterModule.forChild(playersRoutes)],
  exports: [RouterModule]
})
export class PlayerRoutingModule {

}
