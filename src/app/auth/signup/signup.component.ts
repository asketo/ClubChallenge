import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Player } from '../../players/player.model';
import { AuthService } from '../auth.service';
import { PlayerService } from '../../players/player.service';
import { PasswordValidation } from './password-validation';
import { EmailValidation } from './email-validation';

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
    this.form = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: this.fb.group({
          firstEmail: ['', [Validators.required, Validators.email]],
          confirmEmail: ['', [Validators.required, Validators.email]]
        },
        {
          validator: EmailValidation.MatchEmail
        }),
        password: this.fb.group({
          firstPassword: ['', Validators.required],
          confirmPassword: ['', Validators.required]
        },
        {
          validator: PasswordValidation.MatchPassword
        }),
        gender: ['', Validators.required]
      });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.form.status === 'VALID') {
      // Do an entry in players-database.
      this.player.firstName = this.form.value.firstName;
      this.player.lastName = this.form.value.lastName;
      this.player.email = this.form.value.email.firstEmail;
      this.player.gender = this.form.value.gender;
      this.player.challenged = false;
      this.player.rank = 9999;
      // Call the signup-method in AuthService.
      this.authService.emailSignup(this.player, this.form.value.password.firstPassword);
      // this.playerService.createPlayer(this.player);
    } else {
      this.formIsValid = false;
      console.log('Invalid');
    }
  }

  onReset() {
    this.form.reset();
  }
}
