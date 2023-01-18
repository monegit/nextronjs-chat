import { collection, getDocs } from "firebase/firestore";
import { UserData } from "../dto/user";
import { firebase } from "../firebase";

export default async function getUserList() {
  let users: UserData[] = [];
  (await getDocs(collection(firebase, "users"))).forEach((doc) => {
    users.push({
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
    });
  });

  return users;
}
