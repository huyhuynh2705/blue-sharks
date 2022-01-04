import { combineReducers } from 'redux';

import auth from './auth';
import members from './members';

export const reducers = combineReducers({
  auth,
  members,
});
