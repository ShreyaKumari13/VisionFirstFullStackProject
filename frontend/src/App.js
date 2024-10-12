import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard'; 
import EditCompany from './components/EditCompany';
import UserCompanies from './components/UserCompanies'; 
import CreateCompany from './components/CreateCompany';
import CreateAdminCompany from './components/CreateAdminCompany'; // Importing the missing component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/create-company" element={<CreateCompany />} /> {/* New route */}
        <Route path="/edit/:company_id" element={<EditCompany />} />
        <Route path="/user" element={<UserCompanies />} />
        <Route path="/create-admin-company" element={<CreateAdminCompany />} /> {/* Fixed missing closing tag */}
      </Routes>
    </Router>
  );
}

export default App;
