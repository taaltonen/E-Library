import { createContext } from "react";
// creating AuthContext for authorization checks with null values
export const AuthContext = createContext({
  isLoggedIn: false,
  role: null,
  password: null,
  email: null,
  userId: null,
  login: () => {},
  logout: () => {},
});
