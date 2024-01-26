import { Auth } from "../app";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  signOut,
  signInWithEmailAndPassword,

} from "firebase/auth";
import { showNotification } from "../../util/common/notify-user";


import store from "../../hook/store";
import { updateUser } from "../../hook/redux-slice/User";


export const SignOutFromTradeWizard = async () => {
  try {
    await signOut(Auth);
    store.dispatch(updateUser(null))
  } catch (err) {
    showNotification("error")
  }
};

const errorType = (code) => {
  if (code === "auth/email-already-in-use") {
    return "Account in use";
  } else if (code === "auth/missing-password") {
    return "Missing Password";
  } else if (code === "auth/missing-email") {
    return "Missing Email";
  } else if (code === "auth/weak-password") {
    return "Weak password";
  } else if (code === "auth/invalid-email") {
    return "Invalid Email";
  }
  if (code === "auth/user-not-found") {
    return "User Not Found";
  } else if (code === "auth/wrong-password") {
    return "Wrong password";
  } else if (code === "auth/too-many-requests") {
    return "Too many Attemps";
  } else {
    return "Please Try Again";
  }
};

export const SignUpWithTradeWizard = async (data) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      Auth,
      data.email,
      data.password
    );
    const user = userCredential.user;
    await updateProfile(user, {
      displayName: data.name,
    });
    sendEmailVerification(user);
    return { status: true, id: user.uid };
  } catch (err) {
    throw new Error(errorType(err.code));
  }
};

export const SignInWithTradeWizard = async (data) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      Auth,
      data.email,
      data.password
    );
    if (userCredential) {
      return { status: true, id: userCredential.user.uid };
    }
  } catch (err) {
    throw new Error(errorType(err.code));
  }
};

