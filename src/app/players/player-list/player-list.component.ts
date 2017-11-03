import { Component, OnInit, Query } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { PlayerService } from '../player.service';
import { Player } from '../player.model';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  players: FirebaseListObservable<Player[]> = null;
  malePlayers: FirebaseListObservable<Player[]>;
  femalePlayers: FirebaseListObservable<Player[]>;
  gender = 'male';
  genderString = 'Männliche';

  constructor(
    private playerService: PlayerService,
    private db: AngularFireDatabase) { }

  ngOnInit() {
    this.players = this.db.list('/male', {query: {orderByChild: 'rank'}});
    this.malePlayers = this.db.list('/male', {query: {orderByChild: 'rank'}});
    this.femalePlayers = this.db.list('/female', {query: {orderByChild: 'rank'}});
  }

setGender(gender: string) {
  if (gender === 'male') {
    this.gender = 'male';
    this.genderString = 'Männliche';
    this.players = this.malePlayers;
  } else {
    this.gender = 'female';
    this.genderString = 'Weibliche';
    this.players = this.femalePlayers;
  }
}

}
