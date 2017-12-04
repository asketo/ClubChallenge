import { AbstractControl } from '@angular/forms';

export class EmailValidation {

  static MatchEmail(AC: AbstractControl) {

    const firstEmail = AC.get('firstEmail').value;
    const confirmEmail = AC.get('confirmEmail').value;

    if (firstEmail !== confirmEmail) {
      AC.get('confirmEmail').setErrors(
        {
          MatchEmail: true
        }
      )
    } else {
      return null;
    }
  }
}
