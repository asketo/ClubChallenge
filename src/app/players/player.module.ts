import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerComponent } from './player.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { PlayerEditComponent } from './player-edit/player-edit.component';
import { PlayerRoutingModule } from './player-routing.module';
import { SharedFeaturesModule } from '../shared/shared-features.module';
import { PlayerListComponent } from './player-list/player-list.component';

@NgModule({
  declarations: [
    PlayerComponent,
    PlayerDetailComponent,
    PlayerEditComponent,
    PlayerListComponent
  ],
  imports: [
    CommonModule,
    PlayerRoutingModule,
    SharedFeaturesModule
  ]
})
export class PlayerModule {

}
