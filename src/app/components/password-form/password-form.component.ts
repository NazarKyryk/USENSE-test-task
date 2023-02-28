import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.css']
})
export class PasswordFormComponent implements OnInit {
  passwordForm: FormGroup;
  passwordIsValid = false;

  constructor() { }

  ngOnInit() {
    this.passwordForm = new FormGroup({
      'password': new FormControl("", [
        Validators.required,
      ])
    });
  }

  passwordValid(event) {
    this.passwordIsValid = event;
  }
}