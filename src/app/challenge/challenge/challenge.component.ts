import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { Observable } from 'rxjs/Rx';
import { FirebaseListObservable } from 'angularfire2/database-deprecated/firebase_list_observable';

import { AngularFireAuth } from 'angularfire2/auth';
import { PlayerService } from '../../players/player.service';
import { Player } from '../../players/player.model';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {
  user: Observable<firebase.User>;
  playerObject: any;
  opponents: FirebaseListObservable<Player[]>;
  path: string;

  constructor(
    private playerService: PlayerService,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.afAuth.authState;
    this.user.subscribe(authUser => {
      if (authUser) {
        this.db.object(`/gender/${authUser.uid}`).subscribe(gender => {
          if (gender) {
            this.db
              .object(`/${gender.gender}/${authUser.uid}`)
              .subscribe(player => {
                if (player) {
                  this.playerObject = player;
                  this.path = `/${this.playerObject.gender}`;
                  // This player has been confirmed and now he can challenge the whole list. Hardcoded by the rank-number 999.
                  if (player.rank === 999) {
                    this.opponents = this.db.list(this.path, {query: {orderByChild: 'rank', startAt: 1, endAt: 998}});
                    // Fresh player. Do no calculations before he gets confirmed. Hardcoded by the rank-number 9999.
                  } else if (player.rank === 9999) {
                    return;
                    // Regular player with a rank. Calculate his challenge possibilites.
                  } else {
                    this.calculateOpponents();
                  }
                }
              });
          }
        });
      }
    });
  }

  calculateOpponents() {
    const end: number = this.playerObject.rank - 1;
    const topEnd = this.calculateTopEnd();
    this.opponents = this.db.list(this.path, {query: {orderByChild: 'rank', startAt: topEnd, endAt: end }});
  }

  calculateTopEnd(): number {
    const i: number = this.playerObject.rank;
    const row: number = Math.ceil((- 1 + (Math.sqrt(1 + 8 * i))) / 2);
    return this.playerObject.rank - (row - 1);
  }
}
