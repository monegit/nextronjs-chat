import { create } from "zustand";
import { UserData } from "../libs/dto/user";

export const useUserStore = create<UserData>((set) => ({
  name: { firstName: "", lastName: "" },
  birth: { year: 0, month: 0, day: 0 },
  uid: "",
  docId: "",
}));
