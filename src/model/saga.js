import { fork, all } from 'redux-saga/effects';
import * as authSaga from './auth/saga';
// import * as showcaseSaga from './showcase/saga';

export default function* rootSaga(){
  yield all([
    ...Object.values(authSaga),
    // ...Object.values(showcaseSaga)
  ].map(fork));
}