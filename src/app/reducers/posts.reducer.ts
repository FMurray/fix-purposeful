import { Action, ActionReducer } from "@ngrx/store";

import { Post } from '../models/post';

export interface State {
  ids: string[];
  entities: { [id: string]: Post};
}

export const initialState: State = {
  ids: [],
  entities: {}
};

export function postReducer(state = initialState, action: Action): State {
  switch (action.type) {
    case 'UPDATE_ALL_POSTS': return Object.assign({}, state, action.payload);
    default: return state;
  }
}
