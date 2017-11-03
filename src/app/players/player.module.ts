import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerComponent } from './player.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { PlayerRoutingModule } from './player-routing.module';
import { SharedFeaturesModule } from '../shared/shared-features.module';
import { PlayerListComponent } from './player-list/player-list.component';

@NgModule({
  declarations: [
    PlayerComponent,
    PlayerDetailComponent,
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
