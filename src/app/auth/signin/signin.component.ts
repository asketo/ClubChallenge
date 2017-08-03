import { Component, HostBinding, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import * as firebase from 'firebase/app';

// import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  email: string;
  password: string;
  list: FirebaseListObservable<any[]>;
  user: Observable<firebase.User>

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private router: Router) {

    this.list = db.list('users');
    this.user = afAuth.authState;
  }

  ngOnInit() {
  }

  onSignup() {
    this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password);
    console.log('Registrierung war erfolgreich!');
    this.router.navigate(['/signin/edit']);
  }

  onLogin() {
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password);
    this.router.navigate(['/signin/edit']);
  }

  onLogout() {
    this.afAuth.auth.signOut();
  }

  // onUpdateName() {
  //   this.authService.updateName(this.name);
  // }

}
