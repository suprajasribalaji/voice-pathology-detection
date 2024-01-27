import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [current_doctor, setCurrent_doctor] = useState(null);

  const userLogin = (userName,userEmail) => {
    setUser({ userName,userEmail });
  };

  const adminLogin = (adminData) => {
    setAdmin(adminData);
  };

  const doctorLogin = (name, email) => {
    setDoctor({ name, email });
  };

  const userLogout = () => {
    setUser(null);
    setAdmin(null);
    setDoctor(null);
  };

 

  const setCurrentDoctor = (name,email) => {
    setCurrent_doctor({name,email});
  };

  useEffect(() => {
    console.log('Updated User:', user);
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        admin,
        doctor,
        userLogin,
        adminLogin,
        doctorLogin,
        userLogout,
        setCurrentDoctor,
        current_doctor,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
