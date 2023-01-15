import { create } from "zustand";
import { Birth, Name } from "../data/dto/user";

interface UserState {
  name: Name;
  birth: Birth;
  uid: string;
}

export const useUserStore = create<UserState>((set) => ({
  name: { firstName: "", lastName: "" },
  birth: { year: 0, month: 0, day: 0 },
  uid: "",
}));
