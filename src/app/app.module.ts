import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AuthGuard } from './auth-guard.service';
import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './core/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './core/header/header.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { PagenotfoundComponent } from './core/pagenotfound/pagenotfound.component';
import { PlayerService } from './players/player.service';
import { UpdatesComponent } from './core/updates/updates.component';
import { FooterComponent } from './core/footer/footer.component';
import { SignupSuccessComponent } from './auth/signup-success/signup-success.component';
import { SharedFeaturesModule } from './shared/shared-features.module';
import { ProfileComponent } from './auth/profile/profile.component';
import { EditPlayerComponent } from './auth/signin/edit-player/edit-player.component';
import { ChallengeComponent } from './challenge/challenge/challenge.component';
import { ChallengeDetailComponent } from './challenge/challenge/challenge-detail/challenge-detail.component';
import { OpponentDetailComponent } from './challenge/challenge/opponent-detail/opponent-detail.component';
import { ActiveChallengesComponent } from './challenge/active-challenges/active-challenges.component';
import { RankingService } from './ranking/ranking.service';
import { PwResetComponent } from './auth/signin/pw-reset/pw-reset.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SigninComponent,
    SignupComponent,
    PagenotfoundComponent,
    UpdatesComponent,
    FooterComponent,
    SignupSuccessComponent,
    ProfileComponent,
    EditPlayerComponent,
    ChallengeComponent,
    ChallengeDetailComponent,
    OpponentDetailComponent,
    ActiveChallengesComponent,
    PwResetComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    SharedFeaturesModule,
    AdminModule
  ],
  providers: [PlayerService, AuthGuard, RankingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
