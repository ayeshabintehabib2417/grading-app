import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    if (password === 'admin123') {
      navigate('/admin-dashboard');
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center min-vh-100"
      style={{ backgroundColor: 'rgb(70, 63, 166)' }}
    >
      <div className="card p-4 shadow" style={{ width: '300px' }}>
        <h3 className="text-center mb-3">Admin Login</h3>
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Enter Admin Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button className="btn btn-primary w-100" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
