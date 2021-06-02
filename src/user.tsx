import { v4 as uuidv4 } from "uuid";

export interface User {
  name: string;
  uid: string;
}

export const createUser = (name: string): User => {
  return { uid: uuidv4(), name } as User;
};

export const saveUser = (user: User) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const checkSavedUser = (): null | User => {
  const userData = localStorage.getItem("user");
  if (userData) {
    const user: User = JSON.parse(userData);
    return user;
  } else {
    return null;
  }
};


