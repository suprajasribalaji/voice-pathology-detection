import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './Components/Authentication';

import Dashboard from './Components/Dashboard';
import AdminPage from './Components/admin/AdminPage';
import UserTest from './Components/user/UserTest';
import UserPage from './Components/user/UserPage';
import Booking from './Components/consultation/Booking';
import Payment from './Components/medication/Payment';
import DoctorPage from './Components/doctor/DoctorPage';
import UserLogin from './Components/user/UserLogin'; 

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/usertest" element={<UserTest />} />
          <Route path="/doctor" element={<DoctorPage />} />
          <Route path="/userpage" element={<UserPage />} />
          <Route path="/bookappointment" element={<Booking />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/userlogin" element={<UserLogin />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
