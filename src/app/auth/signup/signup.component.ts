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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private db: AngularFireDatabase) {
    this.createForm();
    this.players = db.list('/men');
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
      this.router.navigate(['signup-success'], {relativeTo: this.route})
    }
  }

  onReset() {
    this.form.reset();
  }

  onUpdate(key: string, firstName: string) {
    this.players.update(key, { firstName: firstName })
  }

}
