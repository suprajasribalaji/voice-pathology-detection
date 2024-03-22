import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import { AuthProvider } from './Components/Authentication';

import Dashboard from './Components/Dashboard';
import AdminPage from './Components/admin/AdminPage';
import UserTest from './Components/user/UserTest';
import UserPage from './Components/user/UserPage';
import Booking from './Components/consultation/Booking';
import Payment from './Components/medication/Payment';
import { AuthProvider, useAuth } from './Components/Authentication';
import DoctorPage from './Components/doctor/Doctorpage';
import {message} from 'antd';
function ProtectedRoute({ children, Element }) {
  const { user, admin, doctor } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = (authType, isAuthenticated) => {
      if (!isAuthenticated) {
        message.error(`You are not authenticated as ${authType}. Redirecting to the Homepage.`);
        navigate('/');
      }
    };

    if (Element === UserPage || Element === UserTest || Element === Booking) {
      checkAuthentication('user', user);
    } else if (Element === AdminPage || Element === 'AdminLogin') {
      checkAuthentication('admin', admin);
    } else if (Element === DoctorPage || Element === 'DoctorLogin') {
      checkAuthentication('doctor', doctor);
    }
  }, [Element, user, admin, doctor, navigate]);

  if (Element === UserPage || Element === UserTest || Element === Booking) {
    return user ? children : null;
  } else if (Element === AdminPage || Element === 'AdminLogin') {
    return admin ? children : null;
  } else if (Element === DoctorPage || Element === 'DoctorLogin') {
    return doctor ? children : null;
  }
  return null;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/admin" element={<ProtectedRoute Element={AdminPage}><AdminPage /></ProtectedRoute>} />
        <Route path="/usertest" element={<ProtectedRoute Element={UserTest}><UserTest /></ProtectedRoute>} />
        <Route path="/doctor" element={<ProtectedRoute Element={DoctorPage}><DoctorPage /></ProtectedRoute>} />
        <Route path="/userpage" element={<ProtectedRoute Element={UserPage}><UserPage /></ProtectedRoute>} />
        <Route path="/bookappointment" element={<ProtectedRoute Element={Booking}><Booking /></ProtectedRoute>} />
        <Route path="/payment" element={<ProtectedRoute Element={Payment}><Payment /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

function MainApp() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default MainApp;
