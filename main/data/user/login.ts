import { FirebaseError } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export async function login(email: string, password: string) {
  let message: string;

  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      message = userCredential.user.uid;
    })
    .catch((error: FirebaseError) => {
      message = error.code;
    });

  return message;
}
