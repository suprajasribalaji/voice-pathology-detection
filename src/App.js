import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from './Components/Dashboard';
import AdminPage from './Components/admin/AdminPage';
import UserTest from './Components/user/UserTest';
import UserPage from './Components/user/UserPage';
import Booking from './Components/consultation/Booking';
import Payment from './Components/medication/Payment';
import DoctorPage from './Components/doctor/DoctorPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/admin" element={<AdminPage/>} />
        <Route path="/doctor" element={<DoctorPage/>} />
        <Route path="/usertest" element={<UserTest/>} />
        <Route path="/userpage" element={<UserPage/>} />
        <Route path="/bookappointment" element={<Booking/>} />
        <Route path="/payment" element={<Payment/>} />
      </Routes>
    </Router>
  );
};

export default App;