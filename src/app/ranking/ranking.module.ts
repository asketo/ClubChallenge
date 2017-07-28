import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RankingComponent } from './ranking.component';
import { RankingRoutingModule } from './ranking-routing.module';
import { SharedFeaturesModule } from '../shared/shared-features.module';

@NgModule({
  declarations: [
    RankingComponent
  ],
  imports: [
    CommonModule,
    RankingRoutingModule,
    SharedFeaturesModule
  ]
})
export class RankingModule {

}
