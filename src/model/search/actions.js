export const SET_EVENTS = 'SET_EVENTS';
export const FETCH_EVENTS = 'FETCH_EVENTS';

export const loginRequest = (method, credentials) => ({
  type: LOGIN_REQUEST,
  payload: {method, credentials},
});

export const setEvents = (events) => ({
  type: SET_EVENTS,
  payload: [...events],
});

export const unsetUserAction = () => ({
  type: UNSET_USER,
})
