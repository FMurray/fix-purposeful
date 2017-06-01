import { Action, ActionReducer } from "@ngrx/store";

import { Comment } from '../models/comment';

export interface State {
  ids: number[];
  entities: { [id: number]: Comment};
}

const initialState: State = {
  ids: [],
  entities: {}
};

export function commentReducer(state = initialState, action: Action): State {
  switch (action.type) {
    case 'UPDATE_ALL_COMMENTS': return Object.assign({}, state, action.payload);
    default: return state;
  }
}
