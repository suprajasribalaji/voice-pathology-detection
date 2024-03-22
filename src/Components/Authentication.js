import React, { createContext, useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const nav = useNavigate
  const userLogin = (userData) => {
    setUser(userData);
    console.log(user);

  };

  const adminLogin = (adminData) => {
    setAdmin(adminData);
  };

  const doctorLogin = (doctorData) => {
    setDoctor(doctorData);
  };

  const userLogout = () => {
    setUser(null);
    setAdmin(null);
    setDoctor(null);
  };

  return (
    <AuthContext.Provider value={{ user, admin, doctor, userLogin, adminLogin, doctorLogin, userLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const isAuthenticated = ({ user, admin, doctor }) => {
  return !!user || !!admin || !!doctor;
};
