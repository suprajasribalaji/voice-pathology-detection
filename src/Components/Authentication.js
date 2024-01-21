import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [current_doctor,setCurrent_doctor] = useState(null);

  const userLogin = async (userData) => {
    setUser((prevUser) => {
      console.log(userData); 
      console.log(prevUser);
      return userData; 
    });
    console.log(user);
  };

  const adminLogin = (adminData) => {
    setAdmin((prevAdmin) => {
      console.log(adminData); 
      console.log(prevAdmin);
      return adminData; 
    });
    console.log(doctor);
  };

  const doctorLogin = (doctorData) => {
    setDoctor((prevDoctor) => {
      console.log(doctorData); 
      console.log(prevDoctor);
      return doctorData; 
    });
    console.log(doctor);
  };

  const userLogout = () => {
    setUser(null);
    setAdmin(null);
    setDoctor(null);
  };

  const setcurrentDoctor =(current_doctor)=>{

    setCurrent_doctor((prevcurrDoctor) => {
      console.log(current_doctor); 
      console.log(prevcurrDoctor);
      return current_doctor; 
    });
    console.log(current_doctor);

  }

  useEffect(() => {
    console.log('Updated User:', user);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, admin, doctor, userLogin, adminLogin, doctorLogin, userLogout,setcurrentDoctor,current_doctor }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};


export default AuthProvider;