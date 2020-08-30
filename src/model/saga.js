import { fork, all } from 'redux-saga/effects';
import * as authSaga from './auth/saga';

export default function* rootSaga(){
  yield all([
    ...Object.values(authSaga)
  ].map(fork));
}