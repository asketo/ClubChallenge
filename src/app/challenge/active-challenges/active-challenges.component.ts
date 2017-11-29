import { FirebaseListObservable } from 'angularfire2/database-deprecated/firebase_list_observable';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-active-challenges',
  templateUrl: './active-challenges.component.html',
  styleUrls: ['./active-challenges.component.css']
})
export class ActiveChallengesComponent implements OnInit {
  challengeList: FirebaseListObservable<any[]>;
  completedChallenges: FirebaseListObservable<any[]>;

  constructor(
    private db: AngularFireDatabase
  ) { }

  ngOnInit() {
    this.challengeList = this.db.list('/activeChallenges');
    this.completedChallenges = this.db.list('/completedChallenges', {
      query: {
        limitToLast: 25
      }
    }).map((array) => array.reverse()) as FirebaseListObservable<any[]>;
  }
}
