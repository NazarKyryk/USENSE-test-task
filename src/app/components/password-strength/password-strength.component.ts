import { Component, EventEmitter, Input, OnChanges, Output, SimpleChange } from '@angular/core';

enum PasswordStrength {
  EASY = 'easy',
  MEDIUM = 'medium',
  STRONG = 'strong'
}

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.css']
})
export class PasswordStrengthComponent implements OnChanges {
  @Input() public passwordToCheck: string;
  @Output() passwordStrength = new EventEmitter<boolean>();

  firstStrengthBar: string;
  secondStrengthBar: string;
  thirdStrengthBar: string;

  passwordStatus: string;

  private static readonly EASY_VALIDATION = /^(?:[a-zA-Z]+|\d+|[\!\@\#\$\%\^\&\*\)\(+\=\`~';<>?:"{}.,_№-]+)$/;
  private static readonly MEDIUM_VALIDATION = /^(([a-zA-Z]+[\!\@\#\$\%\^\&\*\)\(+\=\._-]+)|(^[\d\!\@\#\$\%\^\&\*\)\(+\=\`~';<№>?:"{}.,_-]+)|([a-zA-Z0-9]+))$/;
  private static readonly STRONG_VALIDATION = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*№#?&]).+$/g;

  private static getPasswordStrength(password: string): PasswordStrength {
    if (!password) {
      return null;
    } else if (password.length < 8) {
      return PasswordStrength.EASY;
    } else if (PasswordStrengthComponent.EASY_VALIDATION.test(password)) {
      return PasswordStrength.EASY;
    } else if (PasswordStrengthComponent.MEDIUM_VALIDATION.test(password)) {
      return PasswordStrength.MEDIUM;
    } else if (PasswordStrengthComponent.STRONG_VALIDATION.test(password)) {
      return PasswordStrength.STRONG;
    }
    return null;
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    const password = changes.passwordToCheck.currentValue;
    const passwordStrength = PasswordStrengthComponent.getPasswordStrength(password);

    if (!password) {
      this.setBarColors('grey', 'grey', 'grey');
      this.passwordStatus = '';
    } else if (password.length < 8) {
      this.setBarColors('red', 'red', 'red');
    } else if (passwordStrength === PasswordStrength.EASY) {
      this.setBarColors('red', 'grey', 'grey');
      this.passwordStatus = 'Easy';
    } else if (passwordStrength === PasswordStrength.MEDIUM) {
      this.setBarColors('yellow', 'yellow', 'grey');
      this.passwordStatus = 'Medium';
    } else {
      this.setBarColors('green', 'green', 'green');
      this.passwordStatus = 'Strong';
    }
    this.passwordStrength.emit(passwordStrength === PasswordStrength.STRONG);
  }

  private setBarColors(firstBarColor: string, secondBarColor: string, thirdBarColor: string): void {
    this.firstStrengthBar = firstBarColor;
    this.secondStrengthBar = secondBarColor;
    this.thirdStrengthBar = thirdBarColor;
  }
}