import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import { Birth, Name, UserData } from "../dto/user";
import { auth, firebase } from "../firebase";

interface LoginData {
  code: string;
  message: string;
  user?: UserData;
}

export default async function tryLogin(email: string, password: string) {
  let message: LoginData;

  await signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      (await getDocs(collection(firebase, "users"))).forEach((doc) => {
        if (userCredential.user.uid === doc.data().uid)
          message = {
            code: "ok",
            message: userCredential.user.uid,
            user: {
              name: {
                firstName: doc.data().name.firstName,
                lastName: doc.data().name.lastName,
              },
              birth: {
                year: doc.data().birth.year,
                month: doc.data().birth.month,
                day: doc.data().birth.day,
              },

              uid: doc.data().uid,
            },
          };
      });
    })
    .catch((error: FirebaseError) => {
      message = { code: error.code, message: error.message };
    });

  return message;
}
