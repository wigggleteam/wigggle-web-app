import { takeLatest, put, call } from 'redux-saga/effects';

import { setUserAction, unsetUserAction,} from './actions';
import { FETCH_EVENTS } from './actions';
import { signInWithCredentials } from '../../authentication/emailAuth';
// import { currentUser, logoutUser, userAuthStatus, signupUser } from '../../services';


//Worker Saga

function* fetchAuthenticatedUser({ type, payload = {} }) {
  const data = yield call(currentUser, payload);
  
  if (Object.keys(data).includes('user')) {
    yield put(setUserAction(data));
  } else {
    yield put(unsetUserAction());
  }
}

function* authRequestWorker({ type, payload = {}}){
  const { method, credentials } = payload;
  if(method === 'email'){
    const data = yield call(signInWithCredentials, credentials);
  }
}

//Watcher Saga 
export function* watchEventRequest() {
  yield takeLatest(FETCH_EVENTS, authRequestWorker);
}