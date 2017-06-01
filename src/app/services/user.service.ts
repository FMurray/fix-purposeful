import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { User } from '../models/user';

@Injectable()
export class UserService {
  private usersUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor (private http: Http) {}

  getUser(email: string): Observable<User> {
    console.log('called getuser for ' + email)
    return this.http.get(this.usersUrl)
                    .map(res => this.resParse(res, email))
                    .catch(this.handleErr);
  }

  private resParse(res: Response, email: String) {
    const body = res.json();
    const user = body.filter(user => user.email === email);
    return user || null;
  }

  private handleErr (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
