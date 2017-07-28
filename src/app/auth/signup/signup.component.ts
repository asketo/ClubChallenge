import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

// TODO: Send data to database
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  players: FirebaseListObservable<any[]>;
  gender = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private db: AngularFireDatabase) {
      this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['male', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.form.status === 'VALID') {
      if (this.form.value.gender === 'male') {
        this.players = this.db.list('/men');
        this.players.push(this.form.value);
      } else if (this.form.value.gender === 'female') {
        this.players = this.db.list('/women');
        this.players.push(this.form.value);
      }
      this.router.navigate(['admin']);
    }
  }

  onReset() {
    this.form.reset();
  }

}
