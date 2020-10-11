export const SET_USER = 'SET_USER';
export const UNSET_USER = 'UNSET_USER';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const VERIFY_LOGIN = 'VERIFY_LOGIN';
export const SET_ERROR = 'SET_ERROR';

export const loginRequest = (method, credentials) => ({
  type: LOGIN_REQUEST,
  payload: {method, credentials},
});

export const setUserAction = (user, userInfo) => ({
  type: SET_USER,
  payload: { isLoggedIn:true, user, userInfo},
});

export const unsetUserAction = () => ({
  type: UNSET_USER,
})

export const setErrorAction = (error) => ({
  type: SET_ERROR,
  payload: error
})

export const logoutUserAction = () => ({
  type: LOGOUT_REQUEST
})
