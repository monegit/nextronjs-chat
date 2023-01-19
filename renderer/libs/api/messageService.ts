import firebase from "firebase/compat/app";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useUserStore } from "../../store/user";
import { ChatData } from "../dto/chat";
import { Name } from "../dto/user";
import { db } from "../firebase";

const messageRef = db.collection("channelMessages");
const roomRef = db.collection("messages");

const mapMessage = (message: firebase.firestore.DocumentData): ChatData => {
  return {
    text: message.text,
    createdAt: message.createdAt,
    uid: message.messageText,
    name: message.name,
  };
};

export const MessageService = {
  getChannelMessages: async () => {
    let messages: ChatData[] = [];

    try {
      await messageRef
        .orderBy("createdAt")
        .get()
        .then((snapshot) => {
          return snapshot.docs.forEach((doc) => {
            messages.push({
              text: doc.data().text,
              uid: doc.data().uid,
              createdAt: doc.data().createdAt,
              name: doc.data().name,
            });
          });
        });

      return messages;
    } catch (error) {}
  },
  sendChannelMessage: async (uid: string, text: string, name: Name) => {
    const messages = await messageRef.add({
      uid: uid,
      text: text,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      name: name,
    });

    const result = await messages.get().then((querySnapshot) => {
      return querySnapshot.data();
    });

    return {
      message: mapMessage(result),
    };
  },
};
