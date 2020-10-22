import { SET_USER, IS_LOADING, GLOBAL_ERROR } from './ActionTypes';
import axios from './Axios';
const BASE_URL = '/auth';

export const signIn = async (store, dispatch, payload) => {
  try {
    dispatch({ type: IS_LOADING, payload: true });
    const {
      message: { token },
    } = await axios.post(`${BASE_URL}/login`, payload);

    // save token in async storage from here.
    // use that token for subsequent request from Axios.js.

    const user = await axios.post(`${BASE_URL}/logged-in-user`);
    const actions = [
      { type: SET_USER, payload: user },
      { type: IS_LOADING, payload: false },
    ];

    actions.map(dispatch);
    return user;
  } catch (e) {
    const actions = [
      { type: IS_LOADING, payload: false },
      { type: GLOBAL_ERROR, payload: e },
    ];
    actions.map(dispatch);
    console.log(e);
    return false;
  }
};

export const register = async (store, dispatch, payload) => {
  try {
    dispatch({ type: IS_LOADING, payload: true });

    await axios.post(`${BASE_URL}/register`, payload);

    dispatch({ type: IS_LOADING, payload: false });
    return true;
  } catch (e) {
    const actions = [
      { type: IS_LOADING, payload: false },
      { type: GLOBAL_ERROR, payload: e },
    ];
    actions.map(dispatch);
    return false;
  }
};
