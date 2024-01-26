import { Database } from "../app";
import {
  collection,
  addDoc,
} from "firebase/firestore";
import { showNotification } from "../../util/common/notify-user";

export const MessageCollection = collection(Database, "messages");


export const sendMessage = async (content) => {
  try {
    await addDoc(MessageCollection, content);
  } catch (err) {
    showNotification("error")
  }
};
