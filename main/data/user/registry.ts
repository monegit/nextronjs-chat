import { auth, firebase } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ErrorData, FirebaseError } from "@firebase/util";
import { addDoc, collection } from "firebase/firestore";

interface Name {
  firstName: string;
  lastName: string;
}

interface Birth {
  year: number;
  month: number;
  day: number;
}

export async function registry(
  email: string,
  password: string,
  name: Name,
  birth: Birth
) {
  let message: string;

  await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      message = userCredential.user.uid;

      applyInfo(userCredential.user.uid, name, birth);
    })
    .catch((error: FirebaseError) => {
      message = error.code;
    });

  return message;
}

async function applyInfo(uid: string, name: Name, birth: Birth) {
  try {
    const docRef = await addDoc(collection(firebase, "users"), {
      uid: uid,
      name: name,
      birth: birth,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
