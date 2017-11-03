import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import * as firebase from 'firebase/app';

import { PlayerService } from '../../players/player.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: Observable<firebase.User>;
  userDisplayName: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private playerService: PlayerService
  ) { }

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    this.user.subscribe(user => {
      if (user) {
        this.userDisplayName = user.displayName;
      }
    });
  }

  getUser() {
    this.authService.getCurrentUser();
  }

  getName(): string {
    return this.authService.getDisplayName();
  }

  getAuthState() {
    return this.authService.getAuthState();
  }

  onLogout() {
    this.authService.signOut();
  }

}
