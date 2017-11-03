import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database/firebase_list_observable';
import { FirebaseObjectObservable } from 'angularfire2/database/firebase_object_observable';
import * as firebase from 'firebase/app';

import { Player } from '../../../players/player.model';
import { SharedFeaturesModule } from '../../../shared/shared-features.module';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css']
})
export class EditPlayerComponent implements OnInit {
  player: Player;
  authUser: firebase.User;
  gender: string;
  personalForm: FormGroup;
  uid: string;

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

  // TODO: What is the best way? For now: add player-attribute with UID of opponent, to save one firebase-query.
  onEnterScore() {
  //   const activeChallUID = this.player.activeChallengeUID;
  //   const opponentData = this.db.object(`/activeChallenged/${activeChallUID}`);
  }

  // resetAfterScoreEntered(uid: string) {

  // }
}
