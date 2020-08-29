import { HYDRATE } from 'next-redux-wrapper';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const initialState = {
  isLoading: false,
  user: null,
}

function reducer(state, action){
  switch (action.type) {
    case HYDRATE: {
      return { ...state, ...action.payload }
    }
    default:
      return state;
  };
}

const persistConfig = { 
  key: 'auth',
  storage,
  blacklist: ['error', 'signupError'],
};

export default persistReducer(persistConfig, authReducer);