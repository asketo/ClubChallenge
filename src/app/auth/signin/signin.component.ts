import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  public email: string;
  public password: string;

  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit() {
  }

  onLogin() {
    this.authService.emailLogin(this.email, this.password)
      .then((data) => {
        this.router.navigate(['/signin/edit']);
      });
  }

  onSignup() {
    this.router.navigate(['signup']);
  }

}
