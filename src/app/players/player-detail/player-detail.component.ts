import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Player } from '../player.model';
import { PlayersService } from '../players.service';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})
export class PlayerDetailComponent implements OnInit {
  id: number;
  player: Player = null;

  constructor(
    private pService: PlayersService,
    private dss: DataStorageService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.dss.getPlayers();
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.player = this.pService.getPlayer(this.id);
      }
    );
  }
}
