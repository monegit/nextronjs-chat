import zustand, { create } from "zustand";

interface RegistryState {
  email: string;
  password: string;
  name: Name;
  birth: Birth;
}

interface Name {
  firstName: string;
  lastName: string;
}

interface Birth {
  year: number;
  month: number;
  day: number;
}

export const useRegistyStore = create<RegistryState>((set) => ({
  email: "",
  password: "",
  name: { firstName: "", lastName: "" },
  birth: { year: 0, month: 0, day: 0 },
}));
