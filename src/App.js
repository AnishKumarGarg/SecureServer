import React from 'react';
import { Route, Routes } from 'react-router-dom';
// import Signup from './components/Signup';
import Login from './components/Login';
// import HomePage from './pages/HomePage';
import VerifyOTP from './pages/VerifyOTP'; // Import the VerifyOTP component

function App() {
  return (
    <Routes>
      
      <Route path="/" element={<Login />} />
      <Route path="/verify-otp" element={<VerifyOTP />} /> {/* Add route for OTP verification */}
    </Routes>
  );
}

export default App;
