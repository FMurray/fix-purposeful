import { Action, ActionReducer } from "@ngrx/store";

import { User } from '../models/user';

export interface State {
  user: User;
}

const initialState: User = {
  id: null,
  name: '',
  username: '',
  email: '',
  address: {
    street: '',
    suite: '',
    city: '',
    zipcode: '',
    geo: {
      lat: '',
      long: '',
    }
  },
  phone: '',
  website: '',
  company: {
      name: '',
      catchPhrase: '',
      bs: ''
  }
};

export function reducer(state: User = initialState, action: Action) {
  //console.log('user reducer dispatched with: ', action.payload);
  switch (action.type) {
    case 'UPDATE_USER': return Object.assign({}, state, action.payload);
    default: return state;
  }
}
