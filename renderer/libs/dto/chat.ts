import { Timestamp } from "firebase/firestore";
import { Name } from "./user";

export interface ChatData {
  uid: string;
  text: string;
  createdAt: Timestamp;
  name: Name;
}
