import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AdminIndex } from './Components/admin-index';
import { AdminRegister } from './Components/admin-register';
import { AdminLogin } from './Components/admin-login';
import { AdminDashboard } from './Components/admin-dashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<AdminIndex />} />
              <Route path='/register-admin' element={<AdminRegister/>} />
              <Route path='/admin-login' element={<AdminLogin />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
