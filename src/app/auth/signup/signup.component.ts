import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Player } from '../../players/player.model';
import { AuthService } from '../auth.service';
import { PlayerService } from '../../players/player.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  player: Player = new Player();
  formIsValid = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private playerService: PlayerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      gender: ['', Validators.required]
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.form.status === 'VALID') {
      // Do an entry in players-database.
      this.player.firstName = this.form.value.firstName;
      this.player.lastName = this.form.value.lastName;
      this.player.email = this.form.value.email;
      this.player.gender = this.form.value.gender;
      this.player.challenged = false;
      // Call the signup-method in AuthService.
      this.authService.emailSignup(this.player, this.form.value.password);
      // this.playerService.createPlayer(this.player);
    } else {
      this.formIsValid = false;
    }
  }

  onReset() {
    this.form.reset();
  }
}
