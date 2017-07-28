import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Params } from '@angular/router'
// import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Player } from '../player.model';
import { PlayersService } from '../players.service';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})
export class PlayerDetailComponent implements OnInit {
  player: Player;

  constructor(private pService: PlayersService) { }

  ngOnInit() {
    this.player = this.pService.getPlayer();
  }
}
