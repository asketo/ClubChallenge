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
import { DataStorageService } from './shared/data-storage.service';
import { PlayersService } from './players/players.service';
import { AdminComponent } from './admin/admin.component';
import { UpdatesComponent } from './core/updates/updates.component';
import { FooterComponent } from './core/footer/footer.component';
import { RankingDisplayService } from './ranking/ranking-display.service';
import { ConnectionParametersService } from './hidden/connection-parameters.service';

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
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [DataStorageService, PlayersService, RankingDisplayService, ConnectionParametersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
