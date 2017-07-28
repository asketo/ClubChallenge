import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayersComponent } from './players.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { PlayerEditComponent } from './player-edit/player-edit.component';
import { PlayersRoutingModule } from './players-routing.module';
import { SharedFeaturesModule } from '../shared/shared-features.module';

@NgModule({
  declarations: [
    PlayersComponent,
    PlayerDetailComponent,
    PlayerEditComponent
  ],
  imports: [
    CommonModule,
    PlayersRoutingModule,
    SharedFeaturesModule
  ]
})
export class PlayersModule {

}
