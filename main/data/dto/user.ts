export interface Name {
  firstName: string;
  lastName: string;
}

export interface Birth {
  year: number;
  month: number;
  day: number;
}

export interface UserData {
  name: Name;
  birth: Birth;
  uid: string;
}
