import { Database } from "../app";
import {
  collection,
  addDoc,
} from "firebase/firestore";

export const MessageCollection = collection(Database, "messages");


export const sendMessage = async (content) => {
  try {
    await addDoc(MessageCollection, content);
  } catch (err) {
    console.log(err);
  }
};
