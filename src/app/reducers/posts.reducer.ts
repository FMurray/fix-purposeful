import { Action, ActionReducer } from "@ngrx/store";

import { Post } from '../models/post';
import { Comment } from '../models/comment';

export interface State {
  ids: string[];
  posts: Post[];
  postComments: { [id: number]: Comment};
}

export const initialState: State = {
  ids: [],
  posts: [],
  postComments: {}
};

export function reducer(state = initialState, action: Action): State {
  console.log('posts reducer called with: ', action.payload, action.type);
  switch (action.type) {
    case 'UPDATE_ALL_POSTS': {
      const tempComments = {};
      const tempPosts = [];
      action.payload.body.forEach(post => {
        // console.log('post reducer: ', post, post.id);
        tempComments[post.id] = post;
        tempPosts.push(post);
      });
      return Object.assign({}, state, {postComments: tempComments, posts: tempPosts});
    }
    case 'UPDATE_COMMENTS': {
      const id = action.payload.id;
      const comments = action.payload.body;
      console.log('comments: ', comments);
      const newComments = Object.assign({}, state.postComments, {[id]: comments});
      return Object.assign({}, state, {postComments: newComments});
    }
    default: return state;
  }
}
