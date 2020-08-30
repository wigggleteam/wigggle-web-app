import { HYDRATE } from 'next-redux-wrapper';


const initialState = {
  isLoading: false,
  user: null,
}

function _reducer(state = initialState, action){
  switch (action.type) {
    case HYDRATE: {
      return { ...state, ...action.payload }
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

  reducer = persistReducer(persistConfig, _reducer)
}else{
  reducer = _reducer;
}

export default reducer;