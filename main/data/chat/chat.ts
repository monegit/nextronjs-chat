import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  onSnapshot,
  onSnapshotsInSync,
  query,
  Query,
  serverTimestamp,
} from "firebase/firestore";
import { ChatData } from "../dto/chat";
import { _firebase } from "../firebase";

export async function createChannelMessages(uid: string, text: string) {
  try {
    const docRef = await addDoc(collection(_firebase, "channelMessages"), {
      uid: uid,
      text: text,
      createdAt: serverTimestamp(),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getChannelMessages() {
  let messages: ChatData[] = [];

  (await getDocs(collection(_firebase, "channelMessages"))).forEach((doc) => {
    messages.push({
      uid: doc.data().uid,
      text: doc.data().text,
      createdAt: doc.data().createdAt,
    });
  });

  console.log(messages);

  // init 만들어서 초기 채팅 내용 보내주고 하나만 받는걸로 만들고 그거만 보내주기
  return messages;
}
