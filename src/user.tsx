import { v4 as uuidv4 } from "uuid";

export interface User {
  name: string;
  uid: string;
}

export const getUser = (): User | null => {
  const data = localStorage.getItem("user");
  if (data != null) {
    return JSON.parse(data) as User;
  }
  return null;
};

export const createUser = (name: string): User => {
  return { uid: uuidv4(), name } as User;
};

export const saveUser = (user: User) => {
  localStorage.setItem("user", JSON.stringify(user));
};

