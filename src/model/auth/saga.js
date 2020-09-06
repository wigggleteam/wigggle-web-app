import { channel } from 'redux-saga'
import { take, takeLatest, put, call } from 'redux-saga/effects';

import { setUserAction, unsetUserAction, setErrorAction} from './actions';
import { LOGIN_REQUEST, VERIFY_LOGIN, LOGOUT_REQUEST } from './actions';
import { authListener, signInWithCredentials, signoutUser } from '../../firebase/authentication';


const userVerifyChannel = channel()

//Worker Saga

function* loginUserWorker({ type, payload = {} }) {
  const { method, credentials } = payload;
  if(method === 'email'){
    try{
    const data = yield call(signInWithCredentials, credentials);
    yield put(setUserAction(data.user));
    }catch (error){
      const { message = 'Unknown error occurred'} = error;
      yield put(setErrorAction(message));
    }
  }
}

function* logoutUserWorker() {
  const data = yield call(signoutUser);
  yield put(unsetUserAction())
}

function* verifyAuthWorker(){
  console.log('Verifying user...')
  const listener = yield call(authListener);
  listener((user) => {
    if(user){
      console.log('user is there')
      userVerifyChannel.put(setUserAction(user))
    }else{
      console.log('user is not there')
      userVerifyChannel.put(unsetUserAction());
    }
  })
  
}

//Watcher Saga 
export function* watchAuthRequest() {
  yield takeLatest(VERIFY_LOGIN, verifyAuthWorker);
  yield takeLatest(LOGIN_REQUEST, loginUserWorker);
  yield takeLatest(LOGOUT_REQUEST, logoutUserWorker);
}

export function* watchLoginChannel() {
  while (true) {
    const action = yield take(userVerifyChannel)
    yield put(action)
  }
}