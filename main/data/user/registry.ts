import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ErrorData, FirebaseError } from "@firebase/util";

export async function registry(email: string, password: string) {
  let message: string;
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      message = userCredential.user.uid;
    })
    .catch((error: FirebaseError) => {
      message = error.code;
    });

  return message;
}
