import { ReactElement } from "react";
import { create } from "zustand";

interface ModalState {
  isVisible: boolean;
  content: ReactElement;
}

export const useModalStore = create<ModalState>((set) => ({
  isVisible: false,
  content: null,
}));
