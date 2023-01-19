import { collection, getDocs } from "firebase/firestore";
import { UserData } from "../dto/user";
import { _firebase } from "../firebase";

export default async function getUserList(uid: string) {
  let users: UserData[] = [];

  (await getDocs(collection(_firebase, "users"))).forEach((doc) => {
    if (doc.data().uid !== uid)
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
        docId: doc.id,
      });
  });

  return users;
}
