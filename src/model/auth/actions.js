export const SET_USER = 'SET_USER';
export const UNSET_USER = 'UNSET_USER';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';

export const loginRequest = (method, credentials) => ({
  type: LOGIN_REQUEST,
  payload: {method, credentials},
});

export const setUserAction = (user) => ({
  type: SET_USER,
  payload: { isLoggedIn:true, user},
});

export const unsetUserAction = () => ({
  type: UNSET_USER,
})
