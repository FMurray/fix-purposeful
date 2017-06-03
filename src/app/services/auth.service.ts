import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { Store } from '@ngrx/store';

@Injectable()
export class AuthService {
  private user;

  constructor(
    private store: Store<any>
  ) {
    store.select('user').subscribe(user => {
      this.user = user;
    })
  }

  redirectUrl: string;

  // login(): Observable<boolean> {
  //   this.isLoggedIn = true;
  //   return Observable.of(true).do(val => this.isLoggedIn = true);
  // }

  // logout(): void {
  //   this.isLoggedIn = false;
  // }

}
