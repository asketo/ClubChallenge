import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { PagenotfoundComponent } from './core/pagenotfound/pagenotfound.component';
import { RankingComponent } from './ranking/ranking.component';
import { AdminComponent } from './admin/admin.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'players', loadChildren: './players/players.module#PlayersModule' },
    { path: 'ranking', component: RankingComponent },
    { path: 'admin', component: AdminComponent },
    { path: '**', component: PagenotfoundComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
