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

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css']
})
export class EditPlayerComponent implements OnInit, OnDestroy {
  player: Player;
  authUser: firebase.User;
  gender: string;
  personalForm: FormGroup;
  uid: string;
  winner: string;
  opponent: FirebaseObjectObservable<Player>;
  opponentSubscription: Subscription;

  constructor(
    private fireAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
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
                  email: player.email
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
    const opponentUID = this.player.activeChallenge.opponentsUID;
    let challenger: Player;
    let challengedPlayerUID: string = null;
    let champ: Player;
    this.opponentSubscription = this.db
      .object(`/${this.player.gender}/${opponentUID}`)
      .subscribe(opp => {
        this.opponent = opp;
        if (this.player.activeChallenge.isChallenger) {
          challenger = this.player;
          // TODO: Fix this! Getting Error (cannot read undefined) after submitting score.
          challengedPlayerUID = this.player.activeChallenge.opponentsUID;
        } else {
          challenger = opp;
          challengedPlayerUID = opp.uid;
        }
        // Push new entry into completedChallenges-database.
        if (this.winner === 'winnerIsPlayer') {
          champ = this.player;
        } else {
          champ = opp;
        }
        this.db
          .list('/completedChallenges')
          .push({
            challenger: challenger.firstName + ' ' + challenger.lastName,
            challengerUID: challenger.uid,
            winner: champ.firstName + ' ' + champ.lastName,
            challengedPlayer:
              challenger.activeChallenge.opponentsFirstName +
              ' ' +
              challenger.activeChallenge.opponentsLastName,
            challengedPlayerUID: challenger.activeChallenge.opponentsUID
          })
          .then(() => {
            // Remove entry from activeChallenges-database.
            this.db
              .object(
                `/activeChallenges/${this.player.activeChallenge
                  .activeChallengeUID}`
              )
              .remove();
            // Remove all challenge-data that is now deprecated.
            this.db
              .object(`/${challenger.gender}/${challenger.uid}/activeChallenge`)
              .remove();
            this.db
              .object(`/${challenger.gender}/${challenger.uid}`)
              .update({ challenged: false });
            this.db
              .object(
                `/${challenger.gender}/${challengedPlayerUID}/activeChallenge`
              )
              .remove();
            this.db
              .object(`/${challenger.gender}/${challengedPlayerUID}`)
              .update({ challenged: false });
          });
      });
  }
}
