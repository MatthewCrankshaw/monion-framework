import React, { ReactNode, createContext, useState } from "react";
import { buildApiUrl } from "../utilities/login/apiUrlBuilder";

export const AuthContext = createContext<{
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
}>({
  isAuthenticated: false,
  login: (username: string, password: string) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const accessToken = localStorage.getItem("accessToken");
  const [isAuthenticated, setIsAuthenticated] = useState(!!accessToken);

  const login = async (username: string, password: string) => {
    const url = buildApiUrl("oauth/token");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.REACT_APP_CLIENT_ID!,
        client_secret: process.env.REACT_APP_CLIENT_SECRET!,
        scope: "super",
        grant_type: "password",
        username: username,
        password: password,
      }),
    });

    if (!response.ok) {
      setIsAuthenticated(false);
      localStorage.removeItem("accessToken");
      throw new Error(response.statusText);
    } else {
      const data = await response.json();
      localStorage.setItem("accessToken", data.data.accessToken);
      setIsAuthenticated(true);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
