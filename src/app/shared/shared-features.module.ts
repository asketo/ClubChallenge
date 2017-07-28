import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SortPlayersPipe } from './sort-players.pipe';

@NgModule({
  declarations: [SortPlayersPipe],
  imports: [ReactiveFormsModule],
  exports: [
    SortPlayersPipe,
    ReactiveFormsModule]
})
export class SharedFeaturesModule {

}
