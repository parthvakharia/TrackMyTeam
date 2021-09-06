import { SET_USER, IS_LOADING, GLOBAL_ERROR } from './ActionTypes';
import * as SecureStore from 'expo-secure-store';
import axios from './Axios';
const BASE_URL = '/auth';

export const signIn = async (store, dispatch, payload) => {
  try {
    dispatch({ type: IS_LOADING, payload: true });
    const {
      message: { token, user },
    } = await axios.post(`${BASE_URL}/login`, payload);

    await SecureStore.setItemAsync('token', token, { keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY });

    const actions = [
      { type: SET_USER, payload: user },
      { type: IS_LOADING, payload: false },
    ];
  } catch (e) {
    const actions = [
      { type: IS_LOADING, payload: false },
      { type: GLOBAL_ERROR, payload: e },
    ];
    actions.map(dispatch);
  }
};

export const register = async (store, dispatch, payload) => {
  try {
    dispatch({ type: IS_LOADING, payload: true });

    await axios.post(`${BASE_URL}/register`, payload);

    dispatch({ type: IS_LOADING, payload: false });
  } catch (e) {
    const actions = [
      { type: IS_LOADING, payload: false },
      { type: GLOBAL_ERROR, payload: e },
    ];
    actions.map(dispatch);
  }
};
