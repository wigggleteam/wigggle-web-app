import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import authReducer from './auth/reducer';


const rootReducer = combineReducers({
  auth : authReducer,
});

export default persistReducer({}, rootReducer);