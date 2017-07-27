import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Player } from '../players/player.model';
import { PlayersService } from '../players/players.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  players: FirebaseListObservable<any>;
  gender = '';

  constructor(private db: AngularFireDatabase, private route: ActivatedRoute, private pService: PlayersService) {
    }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.gender = params['gender'];
        this.players = this.db.list(this.gender);
      }
    );
  }

  onDetail(player: Player) {
    this.pService.setPlayer(player);
  }

}
