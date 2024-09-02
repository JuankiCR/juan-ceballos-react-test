import React, { createContext, useState, ReactNode, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

interface AppContextType {
  loggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
  checkSession: () => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const login = (token: string) => {
    setLoggedIn(true);
    localStorage.setItem('session', JSON.stringify({ token, timestamp: new Date().getTime() }));
    navigate('/products');
  };

  const logout = () => {
    setLoggedIn(false);
    localStorage.removeItem('session');
    navigate('/');
  };

  const checkSession = () => {
    const session = localStorage.getItem('session');
    if (session) {
      const sessionData = JSON.parse(session);
      const now = new Date().getTime();

      if (now - sessionData.timestamp < 5 * 60 * 1000) { // 5 minutos
        setLoggedIn(true);
      } else {
        logout();
      }
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <AppContext.Provider value={{ loggedIn, login, logout, checkSession }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
