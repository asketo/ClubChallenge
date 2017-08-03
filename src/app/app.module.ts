import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './core/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './core/header/header.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { PagenotfoundComponent } from './core/pagenotfound/pagenotfound.component';
import { PlayersService } from './players/players.service';
import { AdminComponent } from './admin/admin.component';
import { UpdatesComponent } from './core/updates/updates.component';
import { FooterComponent } from './core/footer/footer.component';
import { SignupSuccessComponent } from './auth/signup-success/signup-success.component';
import { SharedFeaturesModule } from './shared/shared-features.module';
import { ProfileComponent } from './auth/profile/profile.component';
import { EditPlayerComponent } from './auth/signin/edit-player/edit-player.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SigninComponent,
    SignupComponent,
    PagenotfoundComponent,
    AdminComponent,
    UpdatesComponent,
    FooterComponent,
    SignupSuccessComponent,
    ProfileComponent,
    EditPlayerComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    SharedFeaturesModule
  ],
  providers: [PlayersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
