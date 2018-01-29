import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-pw-reset',
  templateUrl: './pw-reset.component.html',
  styleUrls: ['./pw-reset.component.css']
})
export class PwResetComponent implements OnInit {
  resetEmail: string;
  emailSuccess = false;
  emailError = false;

  constructor(private afAuth: AngularFireAuth) {}

  ngOnInit() {}

  onSubmit() {
    this.afAuth.auth
      .sendPasswordResetEmail(this.resetEmail)
      .then(success => {
        this.emailSuccess = true;
        this.emailError = false;
      })
      .catch(err => {
        this.emailError = true;
        this.emailSuccess = false;
      });
  }
}
