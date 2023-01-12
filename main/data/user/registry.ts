import { firebaseAuth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export function registry(email: string, password: string) {
  createUserWithEmailAndPassword(firebaseAuth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // console.log(user);

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}
