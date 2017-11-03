import { Component, Input, OnInit } from '@angular/core';
import { FirebaseObjectObservable } from 'angularfire2/database/firebase_object_observable';
import { FirebaseListObservable } from 'angularfire2/database/firebase_list_observable';

import { Player } from '../../../players/player.model';

@Component({
  selector: 'app-challenge-detail',
  templateUrl: './challenge-detail.component.html',
  styleUrls: ['./challenge-detail.component.css']
})
export class ChallengeDetailComponent implements OnInit {
  @Input() player: Player;
  @Input() opponents: Player[];

  constructor() { }

  ngOnInit() {
  }

}
