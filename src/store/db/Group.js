import { getFirebaseInstance } from "../Firebase";
import { extractDataFromQuery } from "./utils";

const db = getFirebaseInstance();
const groupsCollection = db.collection("groups");

