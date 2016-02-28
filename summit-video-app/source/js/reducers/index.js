/*eslint-disable */

import { combineReducers } from 'redux';
import { main } from './main';
import { videos } from './videos';
import { routeReducer } from 'react-router-redux';

export const reducers = combineReducers({
  main,
  videos,
  router: routeReducer
});
/*eslint-enable */
