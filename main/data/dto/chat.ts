import { Timestamp } from "firebase/firestore";

export interface ChatData {
  uid: string;
  text: string;
  createdAt: Timestamp;
}
