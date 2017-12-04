import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';

import { Player } from '../../../players/player.model';

@Component({
  selector: 'app-opponent-detail',
  templateUrl: './opponent-detail.component.html',
  styleUrls: ['./opponent-detail.component.css']
})
export class OpponentDetailComponent implements OnInit {
  @Input() opponent: Player;
  @Input() player: Player;
  @Input() index: number;
  activeChallengeUID: string = null;

  constructor(
    private db: AngularFireDatabase,
    private router: Router
  ) { }

  ngOnInit() {
  }

  // This method pushes a activeChallenge-Object to its database. Then sets the both player's challenged-attribute to true.
  onChallenge(): void {
    const currentDate = new Date(Date.now()).toLocaleDateString();
    this.activeChallengeUID = this.db.list('/activeChallenges').push({
      challengerUID: this.player.uid,
      challengedUID: this.opponent.uid,
      challengerFullName: this.player.firstName + ' ' + this.player.lastName,
      challengedFullName: this.opponent.firstName + ' ' + this.opponent.lastName,
      gender: this.player.gender,
      dateOfChallengeRequest: currentDate
    }).key;
    // Update the challenger's data (Current logged in user).
    this.db.object(`/${this.player.gender}/${this.player.uid}`)
      .update({
        challenged: true,
        activeChallenge:
          {
            activeChallengeUID: this.activeChallengeUID,
            opponentsFirstName: this.opponent.firstName,
            opponentsLastName: this.opponent.lastName,
            opponentsUID: this.opponent.uid,
            isChallenger: true,
            dateOfChallengeRequest: currentDate
          }});
    // Update the opponent's data.
    this.db.object(`/${this.opponent.gender}/${this.opponent.uid}`)
      .update(
        {
          challenged: true,
          activeChallenge:
          {
            activeChallengeUID: this.activeChallengeUID,
            opponentsFirstName: this.player.firstName,
            opponentsLastName: this.player.lastName,
            opponentsUID: this.player.uid,
            isChallenger: false,
            dateOfChallengeRequest: currentDate
          }});
    this.router.navigate(['/active-challenges']);
  }
}
