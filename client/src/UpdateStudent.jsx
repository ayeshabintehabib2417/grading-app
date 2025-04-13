import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdateStudent = () => {
  const [formData, setFormData] = useState({
    email: '', // Only email and grades are in the form now
    grades: {
      classAttendance: false,
      quiz: false,
      assignment: false,
      participation: false,
      extracurricular: false,
    },
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name in formData.grades) {
      setFormData((prev) => ({
        ...prev,
        grades: {
          ...prev.grades,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Logging form data to check if everything is correct
    console.log("Submitting the following data:", formData);

    try {
      const response = await axios.put('http://localhost:5000/users', formData);

      // Checking if response is successful
      if (response.status === 200) {
        alert('Student record updated successfully!');
        navigate('/admin-dashboard');  // Navigate after successful update
      } else {
        alert('Error: ' + response.data);
      }
    } catch (err) {
      // Enhanced error handling
      console.error("Error updating student:", err.response ? err.response.data : err.message);
      alert('Error updating student. Please check the email and try again.');
    }
  };

  return (
    <div className="container mt-5 p-4 rounded" style={{ backgroundColor: '#f8f9fa' }}>
      <h2 className="text-center mb-4">Update Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input
            name="email"
            type="email"
            className="form-control"
            value={formData.email} // Using formData.email directly
            onChange={handleChange}
            placeholder="Enter student Email"
            required
          />
        </div>

        <div className="mb-3">
          <label>Grades</label>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              name="classAttendance"
              checked={formData.grades.classAttendance}
              onChange={handleChange}
            />
            <label className="form-check-label">Class Attendance</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              name="quiz"
              checked={formData.grades.quiz}
              onChange={handleChange}
            />
            <label className="form-check-label">Quiz</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              name="assignment"
              checked={formData.grades.assignment}
              onChange={handleChange}
            />
            <label className="form-check-label">Assignment</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              name="participation"
              checked={formData.grades.participation}
              onChange={handleChange}
            />
            <label className="form-check-label">Participation</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              name="extracurricular"
              checked={formData.grades.extracurricular}
              onChange={handleChange}
            />
            <label className="form-check-label">Extracurricular</label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-100">Update Student</button>
      </form>
    </div>
  );
};

export default UpdateStudent;
