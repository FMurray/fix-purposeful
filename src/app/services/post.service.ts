import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Post } from '../models/post';
import { Comment } from '../models/comment';

@Injectable()
export class PostService {
  private postUrl = 'https://jsonplaceholder.typicode.com/posts';
  private commentUrl = 'https://jsonplaceholder.typicode.com/comments';
  private posts: Observable<any>;

  constructor (
    private http: Http,
    private store: Store<any>
  ) {
    this.posts = store.select('posts');
  }

  getPostsForUserId(id: Number): Observable<Post[]> {
    return this.http.get(this.postUrl, {params: {userId: id}})
                    .map(res => {
                      // console.log('post response: ', res)
                      return this.resParse(res, id, 'UPDATE_ALL_POSTS')
                    })
                    .catch(this.handleErr);
  }

  getCommentsForPostId(id: Number): Observable<Comment[]> {
    return this.http.get(this.commentUrl, {params: {postId: id}})
                    .map(res => {
                      console.log('comment response: ', res);
                      return this.resParse(res, id, 'UPDATE_COMMENTS');
                    })
                    .catch(this.handleErr);
  }


  private resParse(res: Response, id: Number, type: string) {
    const body = res.json();
    if (body.length > 0) {
      this.store.dispatch({type: type, payload: {body: body, id: id}});
    };
    return body || null;
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
