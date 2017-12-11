import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFireDatabase,
  FirebaseObjectObservable
} from 'angularfire2/database-deprecated';
import { FirebaseListObservable } from 'angularfire2/database-deprecated/firebase_list_observable';
import * as firebase from 'firebase/app';

import { Player } from '../../../players/player.model';
import { SharedFeaturesModule } from '../../../shared/shared-features.module';
import { AuthService } from '../../auth.service';
import { RankingService } from '../../../ranking/ranking.service';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css']
})
export class EditPlayerComponent implements OnInit, OnDestroy {
  player: Player = null;
  authUser: firebase.User = null;
  gender: string = null;
  personalForm: FormGroup = null;
  uid: string = null;
  winner: string = null;
  opponent: FirebaseObjectObservable<Player> = null;
  opponentSubscription: Subscription = null;

  constructor(
    private fireAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private ranking: RankingService
  ) {
    // Initialize the form.
    this.createForm();
    // Retrieve the authstate and the UID.
    this.fireAuth.authState.subscribe(user => {
      if (user) {
        this.uid = user.uid;
        this.authUser = user;
        // Retrieve the player's gender based on his UID.
        db.object('/gender/' + user.uid).subscribe(playerGender => {
          if (playerGender) {
            this.gender = playerGender.gender;
            this.db
              .object(`/${playerGender.gender}/${user.uid}`)
              .subscribe(player => {
                this.player = player;
                this.personalForm.patchValue({
                  firstName: player.firstName,
                  lastName: player.lastName,
                  gender: player.gender,
                  email: player.email,
                  rank: player.rank
                });
              });
          }
        });
        return;
      }
      // this.player = null;
    });
  }

  createForm() {
    this.personalForm = this.formBuilder.group({
      // The structure of the form.
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (
      this.opponentSubscription != null &&
      this.opponentSubscription !== undefined
    ) {
      this.opponentSubscription.unsubscribe();
    }
  }

  onUpdate() {
    // this.authUser.updateProfile({displayName: this.personalForm.value.firstName, photoURL: null});
    // Update the player's personal database record.
    this.db
      .object(`/${this.gender}/${this.player.uid}`)
      .update(this.personalForm.value);
    // Update the gender database.
    this.db.object(`/gender/${this.player.uid}`).update({
      firstName: this.player.firstName,
      gender: this.personalForm.value.gender
    });
    // Update the display name in the authentication service.
    this.authService.updateDisplayName(this.personalForm.value.firstName);
  }

  // TODO: Not testet yet.
  onDelete() {
    this.db.object(`/${this.player.gender}/${this.player.uid}`).remove();
    this.db.object(`/gender/${this.player.uid}`).remove();
    this.fireAuth.auth.currentUser
      .delete()
      .then(() => {
        console.log('Spieler gelöscht');
        this.router.navigate(['/']);
      })
      .catch(error => console.log(error));
  }

  selectWinner() {
    // Some constants and variables.
    const opponentUID = this.player.activeChallenge.opponentsUID;
    const currentDate = new Date(Date.now()).toLocaleDateString();
    let challenger: string; // Full name
    let challengerUID: string;
    let challengedPlayerName: string; // Full name
    let challengedPlayerUID: string;
    let champFullName: string;
    let winnerUID: string;
    let loserUID: string;
    let challengerIsWinner = false;

    // Finding out who is the challenger and who is the challenged player.
    if (this.player.activeChallenge.isChallenger) {
      // In this case, the challenger is the opponent of the current (logged-in) player.
      challenger = `${this.player.firstName} ${this.player.lastName}`;
      challengerUID = this.player.uid;
      challengedPlayerName = `${
        this.player.activeChallenge.opponentsFirstName
      } ${this.player.activeChallenge.opponentsLastName}`;
      challengedPlayerUID = this.player.activeChallenge.opponentsUID;
    } else {
      // In this case, the challenger is current player's opponent. Current player is the one, who is logged in.
      challenger = `${this.player.activeChallenge.opponentsFirstName} ${
        this.player.activeChallenge.opponentsLastName
      }`;
      challengedPlayerName = `${this.player.firstName} ${this.player.lastName}`;
      challengedPlayerUID = `${this.player.uid}`;
      challengerUID = this.player.activeChallenge.opponentsUID;
    }
    // Push new entry into completedChallenges-database.
    if (this.winner === 'winnerIsPlayer') {
      champFullName = `${this.player.firstName} ${this.player.lastName}`;
      winnerUID = this.player.uid;
      loserUID = this.player.activeChallenge.opponentsUID;
      if (winnerUID === challengerUID) {
        challengerIsWinner = true;
      }
      // In this case, the winner is the opponent.
    } else {
      champFullName = `${this.player.activeChallenge.opponentsFirstName} ${
        this.player.activeChallenge.opponentsLastName
      }`;
      winnerUID = this.player.activeChallenge.opponentsUID;
      loserUID = this.player.uid;
      if (winnerUID === challengerUID) {
        challengerIsWinner = true;
      }
    }
    this.db
      .list('/completedChallenges')
      .push({
        challenger: challenger,
        challengerUID: challengerUID,
        winner: champFullName,
        challengedPlayer: challengedPlayerName,
        challengedPlayerUID: challengedPlayerUID,
        dateOfCompletion: currentDate,
        challengedPlayerRank: this.player.activeChallenge.challengedPlayerRank
      })
      .then(() => {
        // Remove entry from activeChallenges-database.
        this.db
          .object(
            `/activeChallenges/${
              this.player.activeChallenge.activeChallengeUID
            }`
          )
          .remove();
        // Update the players in the database.
        // First update the challenger's data.
        this.db.object(`/${this.player.gender}/${challengerUID}`).update({
          challenged: false,
          activeChallenge: null
        });
        // Then update the data of the challenged player.
        this.db.object(`/${this.player.gender}/${challengedPlayerUID}`).update({
          challenged: false,
          activeChallenge: null
        });
        // Navigate to the rankings, after the player has entered the score.
        // TODO: Fix the 'men'-thing on ranking!

        // If the challenger has won, call the method which reorders the ranking.
        let challengerRank: number;
        this.db.object(`/${this.player.gender}/${challengerUID}`).take(1).subscribe(player => {
          challengerRank = player.rank;
        });
        if (challengerIsWinner) {
          this.ranking.reorderRanks(this.player.gender, winnerUID, loserUID);
        } else if (challengerRank === 999) {
          // The winner is the challenged player and the challenger had no rank. The challenger's rank has to be set to last position.
          this.ranking.putChallengerLast(this.player.gender, loserUID);
        }
        this.router.navigate(['/ranking/men']);
      });
    // });
  }
}
