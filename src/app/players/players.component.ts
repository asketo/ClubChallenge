import { Component, OnInit } from '@angular/core';

import { PlayersService } from './players.service';
import { Player } from './player.model';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  players: Player[] = this.pService.getPlayers();

  constructor(private pService: PlayersService) { }

  ngOnInit() {
  }

}
