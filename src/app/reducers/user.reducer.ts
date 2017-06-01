import { Action, ActionReducer } from "@ngrx/store";

import { User } from '../models/user';

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

export function userReducer(state: User = initialState, action: Action) {
  switch (action.type) {
    case 'UPDATE_USER': return Object.assign({}, state, action.payload);
    default: return state;
  }
}
