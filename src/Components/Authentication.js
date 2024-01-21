import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [current_doctor_mail,setCurrent_doctormail] = useState(null);
  const [doctor_name,setCurrent_doctorname] = useState(null);

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

    setCurrent_doctormail((prevcurrDoctor) => {
      console.log(current_doctor); 
      console.log(prevcurrDoctor);
      return current_doctor; 
    });
    console.log(current_doctor);

  }

  const setdoctorname = (name)=>{
    setCurrent_doctorname((prevdoctorname)=>{

      console.log(prevdoctorname);
      return name;
    })
  }
  console.log("doctorname",doctor_name);

  useEffect(() => {
    console.log('Updated User:', user);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, admin, doctor, userLogin, adminLogin, doctorLogin, userLogout,setcurrentDoctor,current_doctor_mail,setdoctorname,doctor_name}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};


export default AuthProvider;