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

export function reducer(state = initialState, action: Action): State {
  //console.log('comments reducer invoked: ', state, action.payload)
  switch (action.type) {
    case 'UPDATE_ALL_COMMENTS': {
      //console.log('state in comments reduceR: ', state);
    };
    default: return state;
  }
}
