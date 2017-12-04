import { AbstractControl } from '@angular/forms';

export class PasswordValidation {

  static MatchPassword(AC: AbstractControl) {

    const firstPassword = AC.get('firstPassword').value;
    const confirmPassword = AC.get('confirmPassword').value;

    if (firstPassword !== confirmPassword) {
      AC.get('confirmPassword').setErrors(
        {
          MatchPassword: true
        }
      )
    } else {
      return null;
    }
  }
}
