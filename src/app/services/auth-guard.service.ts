import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Store } from '@ngrx/store';

@Injectable()
export class AuthGuard implements CanActivate {
  private user;

  constructor(
    // private authService: AuthService, 
    private router: Router,
    public store: Store<any>
    ) {
      store.select('user')
        .subscribe(user => this.user = user);
    }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    // //console.log('isLoggedIn from canActivate: ' + this.authService.isLoggedIn);
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.user.email.length > 0) {
      // //console.log('logged in in guard service');
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}
