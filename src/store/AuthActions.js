import * as firebase from 'firebase';
import { addUser, getUser } from './db/User';
import { SET_USER, IS_LOADING, GLOBAL_ERROR } from './ActionTypes';
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
    const { email, password } = payload;
    const { user } = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    const userObj = await getUser(user.uid);
    const actions = [
      { type: SET_USER, payload: userObj },
      { type: IS_LOADING, payload: false },
    ];

    actions.map(dispatch);
    return userObj;
    console.log(`Logged in with ${user.uid}`);
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
  const { email, password } = payload;
  try {
    dispatch({ type: IS_LOADING, payload: true });
    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    await addUser({ ...payload, uid: user.uid });
    dispatch({ type: IS_LOADING, payload: false });
    return true;
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
