import { takeLatest, put, call } from 'redux-saga/effects';

import { setUserAction, unsetUserAction,} from './actions';
import { LOGIN_REQUEST } from './actions';
// import { signInWithCredentials } from '../../authentication/emailAuth';
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
  // if(method === 'email'){
  //   const data = yield call(signInWithCredentials, payload);
  // }
}

//Watcher Saga 
export function* watchAuthRequest() {
  yield takeLatest(LOGIN_REQUEST, authRequestWorker);
}