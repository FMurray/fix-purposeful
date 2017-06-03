import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

import { emailFormatValidator } from '../../shared/email-form.directive';

import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

import { Router } from '@angular/router';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';

import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  providers: [ UserService, AuthService ]
})
export class LoginFormComponent implements OnInit {
  emailForm: FormGroup;

  submitted = false;
  available = false;
  requested = false;
  email = '';
  errorMessage;

  formErrors = {
    'email': ''
  };

  validationMessages = {
    'email': {
      'required': 'Email is required. ',
      'emailFormat': 'Email must match format me@net.com. '
    }
  };

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public router: Router,
    public authService: AuthService
  ) {}

  onSubmit() {
    this.submitted = true;

    this.authService.login().subscribe(() => {
      if (this.authService.isLoggedIn) {
        //console.log('isLoggedIn from form component: ' + this.authService.isLoggedIn);
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/profile';
        // Redirect the user
        this.router.navigate([redirect]);
      }
    });
  }

  buildForm(): void {
    this.emailForm = this.fb.group({
      'email': [this.email, [
        Validators.required,
        emailFormatValidator()
      ]]
    });

    this.emailForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.emailForm.statusChanges
      .debounceTime(500)
      // .filter(s => s === 'VALID')
      .subscribe(() => this.onValid());

    this.onValueChanged();
  }

  onValid() {
    const form = this.emailForm;
    const email = form.get('email').value;
    this.userService.getUser(email)
                    .subscribe(
                      user => {
                        this.requested = true;
                        if (user) {
                          this.available = true;
                        } else {
                          this.available = false;
                        }
                        this.email = email;
                      },
                      error => this.errorMessage = <any>error
                    );
  }

  onValueChanged(data?: any) {
    if (!this.emailForm) { return; }
    const form = this.emailForm;

    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);

        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }



  ngOnInit() {
    this.buildForm();
  }


}
