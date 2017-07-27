import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlayersComponent } from './players.component';
import { PlayerEditComponent } from './player-edit/player-edit.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';

const playersRoutes = [
  {path: '', component: PlayersComponent, children: [
    {path: '', component: PlayerEditComponent, pathMatch: 'full'},
    {path: 'detail', component: PlayerDetailComponent},
    {path: ':id/edit', component: PlayerEditComponent}
  ]}
]

@NgModule({
  imports: [RouterModule.forChild(playersRoutes)],
  exports: [RouterModule]
})
export class PlayersRoutingModule {

}
