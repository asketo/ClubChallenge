import { AuthService } from '../../auth.service';
// import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
// import { AngularFireAuth } from 'angularfire2/auth';
// import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
// import * as firebase from 'firebase/app';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css']
})
export class EditPlayerComponent implements OnInit {
  currentPlayer;

  constructor(private authService: AuthService, private router: Router) {
    
    // this.user = afAuth.authState;
    // this.user.subscribe(
    //   (auth) => {
    //     if (auth) {
    //       console.log('User', afAuth.auth.currentUser.uid);
    //     } else {
    //       router.navigate(['/signin']);
    //       console.log('Bitte zuerst einloggen/registrieren!');
    //     }
    //   });
  }

  ngOnInit() {
  }

}
