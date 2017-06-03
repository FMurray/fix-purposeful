import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    // //console.log('isLoggedIn from canActivate: ' + this.authService.isLoggedIn);
    // return this.checkLogin(url);
    return true;
  }

  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn) {
      // //console.log('logged in in guard service');
      return true;
    }

    this.authService.redirectUrl = url;

    this.router.navigate(['/']);
    return false;
  }
}
