import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import welcomeImg from 'D:/Grading System/client/src/assets/welcome.png'; // Place your image in src/assets folder

const HomePage = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
      <img
        src={welcomeImg}
        alt="Welcome"
        className="img-fluid mb-4"
        style={{ maxWidth: '300px', borderRadius: '10px' }}
      />
      <h1 className="mb-3">Welcome</h1>
      <p className="mb-4">Are you a Student or Admin?</p>
      <div className="d-flex gap-3">
        <Link to="/admin-login" className="btn btn-primary">
          Admin
        </Link>
        <Link to="/student-login" className="btn btn-success">
          Student
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
