import { Component, OnInit } from '@angular/core';

import { User } from '../../models/user';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  submitted = false;
  user = new User('');

  onSubmit() {
    this.submitted = true;
  }

}
