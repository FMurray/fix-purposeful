import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';

import { UserService } from '../services/user.service';

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export function emailFormatValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: boolean} => {
    return EMAIL_REGEX.test(control.value) ? null : {'emailFormat': true};
  };
}

@Directive({
  selector: '[emailFormat]',
  providers: [{provide: NG_VALIDATORS, useExisting: EmailFormatValidatorDirective, multi: true}]
})
export class EmailFormatValidatorDirective implements Validator, OnChanges {
  @Input() forbiddenEmail: string;
  private valFn = Validators.nullValidator;

  constructor(
    private userService: UserService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['emailFormat'];
    if (change) {
      const val: string | RegExp = change.currentValue;
      const re = val instanceof RegExp ? val : new RegExp(val, 'i');
      this.valFn = emailFormatValidator();
    } else {
      this.valFn = Validators.nullValidator;
    }
  }

  validate(control: AbstractControl): {[key: string]: any} {
    return this.valFn(control);
  }
}


// export function emailPresentValidator(): ValidatorFn {
//   return (control: AbstractControl): {[key: string]: boolean} => {
//     return EMAIL_REGEX.test(control.value) ? null : {'emailFormat': true};
//   };
// }

// @Directive({
//   selector: '[emailPresent]',
//   providers: [{provide: NG_VALIDATORS, useExisting: EmailPresentValidatorDirective, multi: true}]
// })
// export class EmailPresentValidatorDirective implements Validator, OnChanges {
//   @Input() email: string;
//   private valFn = Validators.nullValidator;

//   constructor(
//     private userService: UserService
//   ) {}

//   ngOnChanges(changes: SimpleChanges): void {
//     const change = changes['emailPresent'];
//     if (change) {
//       const val: string | RegExp = change.currentValue;
//       const re = val instanceof RegExp ? val : new RegExp(val, 'i');
//       this.valFn = emailPresentValidator();
//     } else {
//       this.valFn = Validators.nullValidator;
//     }
//   }

//   validate(control: AbstractControl): {[key: string]: any} {
//     return this.valFn(control);
//   }
// }