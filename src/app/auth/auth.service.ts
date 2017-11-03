import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFireDatabase,
  FirebaseObjectObservable
} from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { Player } from '../players/player.model';

@Injectable()
export class AuthService {
  authState: any;
  currentUser: Observable<firebase.User>;
  gender: string;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router
  ) {
    this.currentUser = afAuth.authState;
  }

  getUserID(): string {
    return this.afAuth.auth.currentUser.uid;
  }

  // New login with email and password.
  loginWithEmail(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  public getAuthState(): Observable<firebase.User> {
    return this.afAuth.authState;
  }

  public getCurrentUser() {
    return this.currentUser;
  }

  public getCurrentUserEmail() {
    return this.afAuth.auth.currentUser.email;
  }

  public updateDisplayName(name: string) {
    return this.afAuth.auth.currentUser.updateProfile({
      displayName: name,
      photoURL: null
    });
  }

  public getDisplayName(): string {
    return this.afAuth.auth.currentUser.displayName;
  }

  emailSignup(player: Player, password: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(player.email, password)
      .then(user => {
        this.authState = user;
        user.displayName = player.firstName;
        player.uid = user.uid;
        this.updateDisplayName(player.firstName);
        this.setGenderData(player);
        this.setUserData(player);
        this.router.navigate(['/signin/edit']);
      })
      .catch(error => console.log(error));
  }

  setGenderData(player: Player) {
    this.db
      .object(`/gender/${player.uid}`)
      .set({ firstName: player.firstName, gender: player.gender });
  }

  setUserData(player: Player) {
    this.db.object(`/${player.gender}/${player.uid}`).set(player);
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        this.authState = user;
      })
      .catch(error => console.log(error));
  }

  signOut() {
    this.afAuth.auth.signOut();
    this.currentUser = null; // reset
    this.router.navigate(['/']);
  }
}
