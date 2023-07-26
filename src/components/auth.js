import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAIveGU6wLVOZNSNYRRFK3s9daJeKJBtPo",
    authDomain: "tradewizard-393610.firebaseapp.com",
    projectId: "tradewizard-393610",
    storageBucket: "tradewizard-393610.appspot.com",
    messagingSenderId: "2317394615",
    appId: "1:2317394615:web:51cc6441cfdf3271fde332",
    measurementId: "G-RYP8QFWWL5"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
export { auth, provider };