import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../../environments/environment';

import { SortPlayersPipe } from './sort-players.pipe';
import { AuthService } from '../auth/auth.service';

@NgModule({
  declarations: [SortPlayersPipe],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    SortPlayersPipe,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AuthService]
})
export class SharedFeaturesModule {

}
