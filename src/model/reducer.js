import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import showcaseReducer from './showcase/reducer';

const rootReducer = combineReducers({
  auth : authReducer,
  showcase: showcaseReducer,
});

export default rootReducer;