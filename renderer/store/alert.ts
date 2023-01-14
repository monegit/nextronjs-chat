import { ReactElement } from "react";
import { create } from "zustand";

interface AlertState {
  isVisible: boolean;
  content: string;
}

export const useAlertStore = create<AlertState>((set) => ({
  isVisible: false,
  content: null,
}));
