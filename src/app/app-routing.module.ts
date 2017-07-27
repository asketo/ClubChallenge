import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { PagenotfoundComponent } from './core/pagenotfound/pagenotfound.component';
import { AdminComponent } from './admin/admin.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SignupSuccessComponent } from './auth/signup-success/signup-success.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'players', loadChildren: './players/players.module#PlayersModule' },
    { path: 'ranking', loadChildren: './ranking/ranking.module#RankingModule' },
    { path: 'admin', component: AdminComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'signup/signup-success', component: SignupSuccessComponent },
    { path: '**', component: PagenotfoundComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
