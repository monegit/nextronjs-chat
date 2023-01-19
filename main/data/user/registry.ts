import { auth, _firebase } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ErrorData, FirebaseError } from "@firebase/util";
import { addDoc, collection, doc } from "firebase/firestore";
import { Birth, Name } from "../dto/user";

export default async function tryRegistry(
  email: string,
  password: string,
  name: Name,
  birth: Birth
) {
  let message: string;

  await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      message = "ok";

      applyInfo(userCredential.user.uid, name, birth);
    })
    .catch((error: FirebaseError) => {
      message = error.code;
    });

  return message;
}

async function applyInfo(uid: string, name: Name, birth: Birth) {
  try {
    const docRef = await addDoc(collection(_firebase, "users"), {
      uid: uid,
      name: name,
      birth: birth,
      messageRoom: [],
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
