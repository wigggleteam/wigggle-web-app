import { channel } from 'redux-saga'
import { take, takeLatest, put, call } from 'redux-saga/effects';

import { setUserAction, unsetUserAction, setErrorAction} from './actions';
import { LOGIN_REQUEST, VERIFY_LOGIN, LOGOUT_REQUEST } from './actions';
import { authListener, signInWithCredentials, signoutUser } from '../../firebase/authentication';
import { getUsersInfoFromFireStore} from '../../firebase/firestoreServices';


const userVerifyChannel = channel()

//Worker Saga

function* loginUserWorker({ type, payload = {} }) {
  const { method, credentials } = payload;
  if(method === 'email'){
    try{
    const data = yield call(signInWithCredentials, credentials);
    const userInfo = yield call(getUsersInfoFromFireStore, data.user.uid);
    yield put(setUserAction(data.user, userInfo));
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
  console.log('Authentication | Verifying User')
  const listener = yield call(authListener);
  listener(async (user) => {
    if(user){
      console.log('Authentication | User Found')
      const userInfo = await getUsersInfoFromFireStore(user.uid)
      userVerifyChannel.put(setUserAction(user, userInfo))
    }else{
      console.log('Authentication | No User Found')
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