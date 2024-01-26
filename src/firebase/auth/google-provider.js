import { Auth } from "../app";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
export const SignInWithGoogle = async () => {
    try {
        const GoogleAuth = new GoogleAuthProvider()
        const response = await signInWithPopup(Auth, GoogleAuth)
    }
    catch (err) { 
        
    }

}
