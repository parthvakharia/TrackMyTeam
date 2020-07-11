import React, { memo } from "react";
import * as FirebaseCore from "expo-firebase-core";
import * as firebase from "firebase";
import { addUser, getUser } from "./db/User";
import { SET_USER } from "./ActionTypes";

// firebase.auth().onAuthStateChanged((user) => {
//   if (user != null) {
//     console.log("We are authenticated now!");
//   }
//   console.log("listener for auth change", user);
//   // Do other things
// });

export const signIn = async (store, dispatch, payload) => {
  try {
    const { email, password } = payload;
    const { user } = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    console.log(`Logged in with ${user.uid}`);
    const userObj = await getUser(user.uid);
    dispatch(SET_USER, userObj);
  } catch (e) {
    console.log(e);
  }
};

export const registerUser = memo(async (store, dispatch, payload) => {
  const { email, password } = payload;
  try {
    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    await addUser({ ...payload, uid: user.uid });
    const userObj = await getUser(user.uid);
    dispatch(SET_USER, userObj);
  } catch (e) {
    console.log(e);
  }
});
