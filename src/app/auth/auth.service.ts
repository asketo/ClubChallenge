import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
// import { Observable } from 'Rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  // user: Observable<firebase.User>;
  // userID: string;
  // userName: FirebaseListObservable<any>;

  authState: any = null;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {
    // this.user = firebaseAuth.authState;
    this.afAuth.authState.subscribe(
      (auth) => {
        this.authState = auth
      }
    );
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  get currentUserObservable(): any {
    return this.afAuth.authState;
  }

  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  emailSignup(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        this.updateUserData();
      })
      .catch(error => console.log(error));
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        this.updateUserData();
      })
      .catch(error => console.log(error));
  }

  signOut() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

  private updateUserData(): void {
    let path = `users/${this.currentUserId}`;
    let data = {
      email: this.authState.email,
      name: this.authState.displayName
    }
    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }

}

//    signup(email: string, password: string, name: string) {
//      this.firebaseAuth
//       .auth
//       .createUserWithEmailAndPassword(email, password)
//       .then(user => {
//         console.log('Erfolgreich angemeldet!', user);
//         return this.afd.object(`/users/${user.uid}`).set({
//           name: name
//         });
//       })
//       .catch(err => {
//         console.log('Etwas ist schiefgelaufen:', err.message);
//       });
//    }

//    login(email: string, password: string) {
//      this.firebaseAuth
//       .auth
//       .signInWithEmailAndPassword(email, password)
//       .then(value => {
//         console.log('Einloggen erfolgreich!', value);
//       })
//       .catch(err => {
//         console.log('Etwas ist schiefgelaufen!', err.message);
//       })
//    }

//    logout() {
//      this.firebaseAuth
//       .auth
//       .signOut();
//    }

//    updateName(name: string) {
//      const userID = this.firebaseAuth.auth.currentUser.uid;
//      this.afd.object(`/users/${userID}`).update({name: name});
//      this.getCurrentUserName();
//    }

//    getCurrentUserName() {
//      this.userID = this.firebaseAuth.auth.currentUser.uid;
//     //  this.userName = this.afd.list(`/users/${this.userID}/${name}`).subscribe(value => { this.userName = value };
//      console.log(this.userName);
//    }
// }
