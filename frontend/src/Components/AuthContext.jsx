import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const setAuthState = (loggedIn, userData) => {
    setIsLoggedIn(loggedIn);
    setUser(userData);
  };

  const loggedOut = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return <AuthContext.Provider value={{ isLoggedIn, user, setAuthState, loggedOut }}>{children}</AuthContext.Provider>;
};
