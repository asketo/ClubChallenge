import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

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
    SignupSuccessComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    SharedFeaturesModule
  ],
  providers: [PlayersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
