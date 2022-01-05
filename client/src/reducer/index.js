import { combineReducers } from 'redux';

import auth from './auth';
import members from './members';
import activities from './activities';

export const reducers = combineReducers({
  auth,
  members,
  activities,
});
