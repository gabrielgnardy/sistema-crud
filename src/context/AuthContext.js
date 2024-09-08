import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token && window.location.pathname != "reset-password" && window.location.pathname != "register") {
        localStorage.removeItem('token');
        setUser(null);
        navigate("/");
      }
    };
    fetchUser();
  }, []);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};
