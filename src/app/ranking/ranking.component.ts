import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';

import { Player } from '../players/player.model';
import { PlayerService } from '../players/player.service';
import { SortPlayersPipe } from '../shared/sort-players.pipe';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  players: FirebaseListObservable<any>;
  gender = '';

  constructor(
    private db: AngularFireDatabase,
    private route: ActivatedRoute,
    private pService: PlayerService) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.gender = params['gender'];
        if (this.gender === 'men') {
          this.players = this.db.list('/male');
        } else {
          this.players = this.db.list('/female');
        }
      }
    );
  }

  onChangeToFemale() {
    this.players = this.db.list('/female');
    this.gender = 'women';
  }

  onChangeToMale() {
    this.players = this.db.list('/male');
    this.gender = 'men';
  }
}
