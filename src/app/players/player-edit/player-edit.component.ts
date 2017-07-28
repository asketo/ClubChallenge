import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Player } from '../player.model';
import { PlayersService } from '../players.service';

@Component({
  selector: 'app-player-edit',
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.css']
})
export class PlayerEditComponent implements OnInit {
  player: Player;
  players: FirebaseListObservable<any>;
  editForm: FormGroup;

  constructor(
    private pService: PlayersService,
    private db: AngularFireDatabase,
    private router: Router,
    private fb: FormBuilder) {
    }

  ngOnInit() {
    // Extract Player's gender to determine which database-table should be loaded
    this.player = this.pService.getPlayer();
    if (this.player.gender === 'male') {
      this.players = this.db.list('men');
    } else if (this.player.gender === 'female') {
      this.players = this.db.list('women');
    } else {
      this.router.navigate(['admin']);
    }
    this.createForm();
  }

  onUpdate() {
    this.players.update(this.pService.playerKey, this.editForm.value);
  }

  onDelete() {
    this.players.remove(this.pService.playerKey);
    this.router.navigate(['admin']);
  }

  onCancel() {
    this.router.navigate(['admin']);
  }

  createForm() {
    this.editForm = this.fb.group({
      firstName: this.player.firstName,
      lastName: this.player.lastName,
      email: this.player.email,
      gender: this.player.gender,
      rank: this.player.rank
    });
  }

}
