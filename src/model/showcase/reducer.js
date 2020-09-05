import { HYDRATE } from 'next-redux-wrapper';
import { SET_EVENTS } from './actions';

const initialState = {
  events: [],
  filters: {}
}

function _reducer(state = initialState, action){
  switch (action.type) {
    case HYDRATE: {
      return { ...state }
    }
    case SET_EVENTS: {
      const events = _.cloneDeep(action.payload);
      return { ...state, events }
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
    key: 'events',
    storage,
    blacklist: [],
  };

  reducer = persistReducer(persistConfig, _reducer)
}else{
  reducer = _reducer;
}

export default reducer;