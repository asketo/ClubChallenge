// import { Router } from '@angular/router';
// import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // constructor(private afAuth: AngularFireAuth, private router: Router) {}
  constructor() {}

  ngOnInit() {
    // this.afAuth.authState.subscribe(
    //   user => {
    //     if (user) {
    //       this.router.navigate(['']);
    //     } else {
    //       this.router.navigate(['signin']);
    //     }
    //   });
  }

}
