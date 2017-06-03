import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';

import * as fromUser from './user.reducer';
import * as fromPosts from './posts.reducer';
// import * as fromComments from './comments.reducer';


export interface State {
  user: fromUser.State;
  posts: fromPosts.State;
  // comments: fromComments.State;
}

const reducers = {
  user: fromUser.reducer,
  posts: fromPosts.reducer,
  // comments: fromComments.reducer
};

const productionReducer: ActionReducer<State> = combineReducers(reducers);

// for development, add a deep freez'd reducer to ensure no mutations of state
export function reducer(state: any, action: any) {
  return productionReducer(state, action);
}

// // functions to select slices of the state
// export const getUserState = (state: State) => state.user;

// export const getPostsState = (state: State) => state.posts;
// export const getPostEntities = createSelector(getPostsState, fromPosts.getEntities);
// export const getPostIds = createSelector(getPostsState, fromPosts.getId);

