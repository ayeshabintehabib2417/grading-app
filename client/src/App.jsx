import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage'; // Import the HomePage component
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import StudentLogin from './StudentLogin';
import AddStudent from './AddStudent';
import UpdateStudent from './UpdateStudent';
import StudentRecord from './StudentRecord';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />  {/* Default HomePage */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/update/:id" element={<UpdateStudent />} />
        <Route path="/student-record" element={<StudentRecord />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
