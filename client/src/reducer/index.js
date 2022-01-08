import { combineReducers } from 'redux';

import auth from './auth';
import members from './members';
import activities from './activities';
import participants from './participants';

export const reducers = combineReducers({
  auth,
  members,
  activities,
  participants,
});
