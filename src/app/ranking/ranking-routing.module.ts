import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RankingComponent } from './ranking.component';

const rankingRoutes: Routes = [
  {path: '', component: RankingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(rankingRoutes)],
  exports: [RouterModule]
})
export class RankingRoutingModule {

}
