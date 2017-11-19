import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';

@Component({
  selector: 'app-signup-success',
  templateUrl: './signup-success.component.html',
  styleUrls: ['./signup-success.component.css']
})
export class SignupSuccessComponent implements OnInit {
  players: FirebaseListObservable<any[]>;

  constructor(db: AngularFireDatabase) {
    this.players = db.list('/men');
  }

  ngOnInit() {
  }

  onUpdate(key: string, firstName: string) {
    this.players.update(key, { firstName: firstName })
  }

}
