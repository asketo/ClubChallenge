import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {
  public email: string;
  public password: string;
  loginError = false;
  authObserve: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit() {
    this.authObserve = this.authService.getAuthState()
      .subscribe(user => {
        if (user) {
          this.router.navigate(['/signin/edit']);
        }
      });
  }

  ngOnDestroy() {
    this.authObserve.unsubscribe();
  }

  onLogin() {
    this.authService.emailLogin(this.email, this.password)
      .then(user => {
        if (!user) {
          this.loginError = true;
        }
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  onPasswordReset() {
    this.router.navigate(['pw-reset']);
  }

  onSignup() {
    this.router.navigate(['signup']);
  }

}
