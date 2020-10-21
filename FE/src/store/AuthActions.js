import { SET_USER, IS_LOADING, GLOBAL_ERROR } from './ActionTypes';
import {API_URL,API_REGISTER,API_LOGIN} from '@env';
import {callApi} from '../Redux/ApiCalling'

// firebase.auth().onAuthStateChanged((user) => {
//   if (user != null) {
//     console.log("We are authenticated now!");
//   }
//   console.log("listener for auth change", user);
//   // Do other things
// });

export const signIn = async (store, dispatch, payload) => {
  try {
    dispatch({ type: IS_LOADING, payload: true });

    const actions = [
      { type: SET_USER, payload: userObj },
      { type: IS_LOADING, payload: false },
    ];

    actions.map(dispatch);
    return userObj;
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

// export const register = async (store, dispatch, payload) => {
//   const { email, password } = payload;
//   try {
//     dispatch({ type: IS_LOADING, payload: true });
//     // login here
//     dispatch({ type: IS_LOADING, payload: false });
//     return true;
//   } catch (e) {
//     const actions = [
//       { type: IS_LOADING, payload: false },
//       { type: GLOBAL_ERROR, payload: e },
//     ];
//     actions.map(dispatch);
//     return false;
//   }
// };

export const RegisterInUser = (userData) => {
  
  return (dispatch) => {
    return callApi(API_URL + API_REGISTER, 'post', userData)
      .then((res) => {
        if (res.status==="success") {
          dispatch({
            type: SET_USER,
            payload: res?? null,
          });
          return Promise.resolve(res);
        } else if (res.error) {
          return Promise.reject(res.data);
        }
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  };
};
export const LoginInUser = async(userData,dispatch) => {
  debugger
  return (dispatch) => {
    return callApi(API_URL + API_LOGIN, 'post', userData)
      .then((res) => {
        if (res.status==="success") {
          dispatch({
            type: SET_USER,
            payload: res?? null,
          });
          return Promise.resolve(res);
        } else if (res.error) {
          return Promise.reject(res.data);
        }
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  };
};

