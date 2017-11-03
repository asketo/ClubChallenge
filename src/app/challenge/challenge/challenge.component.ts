import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Rx';
import { FirebaseListObservable } from 'angularfire2/database/firebase_list_observable';

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

  constructor(
    // private authService: AuthService,
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
                  this.calculateOpponents();
                }
              });
          }
        });
      }
    });
  }

  calculateOpponents() {
    const path = `/${this.playerObject.gender}`;
    const end = (this.playerObject.rank - 1).toString();
    this.opponents = this.db.list(path, {query: {orderByChild: 'rank', startAt: this.calculateTopEnd(), endAt: end }});
  }

  calculateTopEnd(): string {
    const i = this.playerObject.rank;
    const row = Math.ceil((- 1 + (Math.sqrt(1 + 8 * i))) / 2);
    return (this.playerObject.rank - (row - 1)).toString();
  }
}
