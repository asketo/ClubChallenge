import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Player } from '../player.model';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})
export class PlayerDetailComponent implements OnInit {
  @Input() player: Player;
  showEditArea = false;

  constructor(
    private playerService: PlayerService,
    private router: Router) {
    }

  ngOnInit() {
  }

  toggleEditPlayer(player: Player) {
    this.showEditArea = !this.showEditArea;
  }

  updatePlayer() {
    this.playerService.updatePlayer(this.player);
  }
}
