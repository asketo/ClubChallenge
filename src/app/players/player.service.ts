import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import {
  AngularFireDatabase,
  FirebaseListObservable,
  FirebaseObjectObservable
} from 'angularfire2/database';

import { AuthService } from '../auth/auth.service';
import { Player } from './player.model';

@Injectable()
export class PlayerService {
  currentPlayer: Observable<Player>;
  uid: string;
  gender: string;

  constructor(
    private router: Router,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {
  }

  getMalePlayers() {

  }

  createPlayer(player: Player): void {
    this.db.object(`${player.gender}/${player.uid}`).set(player);
    this.db
      .object(`/gender/${player.uid}`)
      .set({ firestName: player.firstName, gender: player.gender });
    this.router.navigate(['/signin/edit']);
  }

  updatePlayer(player: Player) {
    this.db.object(`${player.gender}/${player.uid}`).update(player);
    this.db
      .object(`/gender/${player.uid}`)
      .set({ gender: player.gender, firstName: player.firstName });
  }

  private handleError(error) {
    console.log(error);
  }
}
