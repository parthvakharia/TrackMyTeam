import * as FirebaseCore from 'expo-firebase-core';
import * as firebase from 'firebase';
import 'firebase/firestore';

let db;

export const getFirebaseInstance = () => {
  if (!db) {
    console.log('init firebase called');
    firebase.initializeApp(FirebaseCore.DEFAULT_APP_OPTIONS);
    db = firebase.firestore();
  }
  return db;
};
