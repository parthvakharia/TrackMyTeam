import { getFirebaseInstance } from '../Firebase';
import { extractDataFromQuery } from './utils';

const db = getFirebaseInstance();
const usersCollection = db.collection('users');

export const addUser = async ({
  uid,
  username,
  email,
  profilePicture,
  currentLocation,
}) => {
  try {
    await usersCollection.add({
      uid,
      username,
      email,
      profilePicture,
      currentLocation,
    });
  } catch (e) {
    console.log(e);
  }
};
export const getUser = async (uid) => {
  try {
    const qs = await usersCollection.where('uid', '==', uid).limit(1).get();
    const user = extractDataFromQuery(qs)[0];
    return user;
  } catch (e) {
    console.log(e);
  }
};
