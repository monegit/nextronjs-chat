import { create } from "zustand";

interface MessageState {
  messageDocId: string;
}

export const useMessageStore = create<MessageState>((set) => ({
  messageDocId: "",
}));
