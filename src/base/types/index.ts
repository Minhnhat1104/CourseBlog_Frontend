export interface User {
  _id: string;
  name: string;
  username: string;
  isadmin: boolean;
  phoneNumber: string;
  email?: string;
}

export interface UserContextValue {
  user: User | null;
  setUser: (user: User | null) => void;
}
