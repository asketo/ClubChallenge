import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';

import { Player } from '../player.model';
import { PlayersService } from '../players.service';

@Component({
  selector: 'app-player-edit',
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.css']
})
export class PlayerEditComponent implements OnInit {
  player: Player;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pService: PlayersService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.player = this.pService.getPlayer(this.id);
      }
    )
  }

}
