import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AuthGuard } from './auth-guard.service';
import { HomeComponent } from './core/home/home.component';
import { PagenotfoundComponent } from './core/pagenotfound/pagenotfound.component';
import { AdminComponent } from './admin/admin.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SignupSuccessComponent } from './auth/signup-success/signup-success.component';
import { EditPlayerComponent } from './auth/signin/edit-player/edit-player.component';
import { ChallengeComponent } from './challenge/challenge/challenge.component';
import { ActiveChallengesComponent } from './challenge/active-challenges/active-challenges.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'players', loadChildren: './players/player.module#PlayerModule' },
    { path: 'ranking', loadChildren: './ranking/ranking.module#RankingModule' },
    { path: 'admin', loadChildren: './admin/admin.module#AdminModule', canLoad: [AuthGuard] },
    { path: 'signin', component: SigninComponent },
    { path: 'signin/edit', component: EditPlayerComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'signup/signup-success', component: SignupSuccessComponent },
    { path: 'challenge', component: ChallengeComponent },
    { path: 'active-challenges', component: ActiveChallengesComponent },
    { path: '**', component: PagenotfoundComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
