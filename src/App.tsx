import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AdminIndex } from "./Components/admin-index";
import { AdminRegister } from "./Components/admin-register";
import { AdminLogin } from "./Components/admin-login";
import { AdminDashboard } from "./Components/admin-dashboard";
import { AddNewEmployee } from "./Components/add-employee";
import { EditEmployee } from "./Components/edit-employee";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminIndex />} />
          <Route path="/register-admin" element={<AdminRegister />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/add-employee" element={<AddNewEmployee />} />
          <Route path="/edit-employee" element={<EditEmployee />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
