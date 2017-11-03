import { FirebaseListObservable } from 'angularfire2/database/firebase_list_observable';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-active-challenges',
  templateUrl: './active-challenges.component.html',
  styleUrls: ['./active-challenges.component.css']
})
export class ActiveChallengesComponent implements OnInit {
  challengeList: FirebaseListObservable<any>;

  constructor(
    private db: AngularFireDatabase
  ) { }

  ngOnInit() {
    this.challengeList = this.db.list('/activeChallenges');
  }

}
