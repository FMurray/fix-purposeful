import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import { PostService } from '../services/post.service';

import { User } from '../models/user';
import { State } from '../reducers/posts.reducer';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ PostService ]
})
export class ProfileComponent implements OnInit {
  public user;
  public posts;
  public postComments;

  constructor(
    private store: Store<any>,
    public postService: PostService
  ) {
    store.select('user').subscribe((user: User) => {
      this.user = user;
    });
    store.select('posts').subscribe((posts: State) => {
      //console.log('store select posts: ', posts.posts);
      this.posts = posts.posts;
      this.postComments = posts.postComments;
    });
   }

  ngOnInit() {
    // this.postService.getCommentsForPostId(1);
    this.postService.getPostsForUserId(this.user.id)
    //   // .map(data => {
    //   //   return data.map(post => {
    //   //     return Object.assign(post, {comments: this.postService.getCommentsForPostId(post.id)
    //   //         .subscribe(comments => comments)
    //   //     })
    //   //   })
    //   // })
      .subscribe(posts => {
        posts.forEach(post => {
          this.postService.getCommentsForPostId(post.id)
            .subscribe(comments => {
              // console.log('comment: ', comments, post.id)
            })
        });
        //console.log('post subscribe val: ', this.posts);
      },
      error => {
        console.error('error getting posts for user email');
      });
  }

}
