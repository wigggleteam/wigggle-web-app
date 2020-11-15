import _ from 'lodash';
import { HYDRATE } from 'next-redux-wrapper';
import { SET_ERROR, SET_USER, UNSET_USER } from './actions';

const initialState = {
  loading: true,
  isLoggedIn: false,
  user: null,
  userInfo: null,
  error: '',
}

function _reducer(state = initialState, action){
  switch (action.type) {
    case HYDRATE: {
      return { ...state }
    }
    case SET_ERROR: {
      return { ...state, error: action.payload, loading: false}
    }
    case SET_USER: {
      const data = _.cloneDeep(action.payload);
      return {...state, ...data, loading: false}
    }
    case UNSET_USER: {
      return {...initialState, loading: false}
    }
    default:
      return state;
  };
}

let reducer;
var isNode = require('detect-node');
if (!isNode) {
  const { persistReducer } = require('redux-persist');
  const storage = require('redux-persist/lib/storage').default;

  const persistConfig = { 
    key: 'auth',
    storage,
    blacklist: [],
  };

  reducer = persistReducer(persistConfig, _reducer);
}else{
  reducer = _reducer;
}

export default reducer;