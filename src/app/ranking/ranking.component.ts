import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';

import { DataStorageService } from '../shared/data-storage.service';
import { Player } from '../players/player.model';
import { PlayersService } from '../players/players.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  playersList: Player[];
  subscription = new Subscription;

  constructor(private dService: DataStorageService, private pService: PlayersService) { }

  ngOnInit() {
    this.dService.getPlayers();
    this.playersList = this.pService.getPlayers();
    this.subscription = this.pService.playersChanged
      .subscribe((players: Player[]) => {
        this.playersList = players;
      });
  }
}
