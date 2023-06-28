import { createContext, useState } from "react";

// Crea il contesto
export const AuthContext = createContext();

// Componente Provider del contesto
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const setAuthState = (loggedIn, userData) => {
    setIsLoggedIn(loggedIn);
    setUser(userData);
  };

  return <AuthContext.Provider value={{ isLoggedIn, user, setAuthState }}>{children}</AuthContext.Provider>;
};