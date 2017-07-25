import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RankingComponent } from './ranking.component';
import { RankingRoutingModule } from './ranking-routing.module';
import { SortPlayersPipe } from './sort-players.pipe';

@NgModule({
  declarations: [
    RankingComponent,
    SortPlayersPipe
  ],
  imports: [
    CommonModule,
    RankingRoutingModule
  ]
})
export class RankingModule {

}
