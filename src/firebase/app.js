import store from "../hook/store";
import { updateUser } from "../hook/redux-slice/User";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const key = process.env.REACT_APP_FIREBASE_KEY;

const firebaseConfig = {
  apiKey:key,
  authDomain: "tradewizard-393610.firebaseapp.com",
  projectId: "tradewizard-393610",
  storageBucket: "tradewizard-393610.appspot.com",
  messagingSenderId: "2317394615",
  appId: "1:2317394615:web:6dbb71e355923df1fde332",
  measurementId: "G-K9VZVGC8DB",
};

const App = initializeApp(firebaseConfig);
export const Auth = getAuth(App);
export const Database = getFirestore(App);

Auth.onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(
      updateUser({
        name: user.displayName,
        id: user.uid,
        email: user.email,
        status: true,
      })
    );
  } else {
    store.dispatch(updateUser(null));
  }
});

//   apiKey: "AIzaSyAIveGU6wLVOZNSNYRRFK3s9daJeKJBtPo",
