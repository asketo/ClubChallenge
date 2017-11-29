import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  AngularFireDatabase,
  FirebaseListObservable
} from 'angularfire2/database-deprecated';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/take';

import { Player } from 'app/players/player.model';

@Injectable()
export class RankingService {
  malePlayers: Observable<Player[]>;
  femalePlayers: Observable<Player[]>;
  players: Observable<Player[]>;
  gender: string;
  winnerUID: string;
  loserUID: string;
  winnerRank: number;
  loserRank: number;

  constructor(private router: Router, private db: AngularFireDatabase) {
    this.malePlayers = this.db.list('/male');
    this.femalePlayers = this.db.list('/female');
  }

  // This method is only needed, if the challenger has won against his opponent.
  reorderRanks(gender: string, winnerUID: string, loserUID: string) {
    this.winnerUID = winnerUID;
    this.loserUID = loserUID;

    // 'players' becomes the subscription to the male- or female-list of players.
    if (gender === 'male') {
      this.gender = 'male';
      this.players = this.malePlayers;
    } else {
      this.gender = 'female';
      this.players = this.femalePlayers;
    }

    let playersList: Player[];

    // Get the list one time, then cancel the subscription.
    this.players.take(1).subscribe(list => {
      playersList = list;

      // First loop to determine the 'old' ranks of both players.
      for (let i = 0; i < playersList.length; i++) {
        if (playersList[i].uid === this.winnerUID) {
          this.winnerRank = playersList[i].rank;
        }
        if (playersList[i].uid === this.loserUID) {
          this.loserRank = playersList[i].rank;
        }
      }

      // Second loop to set the new ranks.
      // Check if the rank of current player is between winner and loser. If this is true, then count plus one to his current rank.
      for (let j = 0; j < playersList.length; j++) {
        if (
          playersList[j].rank > this.loserRank &&
          playersList[j].rank < this.winnerRank
        ) {
          playersList[j].rank++;
          this.db
            .object(`/${this.gender}/${playersList[j].uid}`)
            .update({ rank: playersList[j].rank });
        }
      }

      // Third loop to set the final rank of loser and winner.
      // TODO: There has to be a non-loop solution!
      for (let k = 0; k < playersList.length; k++) {
        if (playersList[k].uid === this.winnerUID) {
          playersList[k].rank = this.loserRank;
          this.db
            .object(`/${this.gender}/${playersList[k].uid}`)
            .update({ rank: playersList[k].rank });
        }
        if (playersList[k].uid === this.loserUID) {
          playersList[k].rank++;
          this.db
            .object(`/${this.gender}/${playersList[k].uid}`)
            .update({ rank: playersList[k].rank });
        }
      }
    });

    // Route the user to the (new) ranking.
    // TODO: Fix this /men thing!
    this.router.navigate(['/ranking/men']);
  }

  // This method is called, if the challenger is a unranked player and his rank has to be set to last position.
  putChallengerLast(gender: string, loserUID: string) {
    this.db
      .list(`/${gender}`)
      .take(1)
      .subscribe(list => {
        let listLength = null;
        for (let i = 0; i < list.length; i++) {
          if (!(list[i].rank === 999 || list[i].rank === 9999)) {
            listLength++;
          }
        }
        listLength++; // Add one to length because in the for loop we've subtracted the player, too.
        this.db.object(`/${gender}/${loserUID}`).update({ rank: listLength });
      });
  }
}
