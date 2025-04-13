import { React, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link to navigate to the dashboard

function AddStudent() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    classAttendance: false,
    quiz: false,
    assignment: false,
    participation: false,
    extracurricular: false,
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/users", {
        name: form.name,
        email: form.email,
        grades: {
          classAttendance: form.classAttendance,
          quiz: form.quiz,
          assignment: form.assignment,
          participation: form.participation,
          extracurricular: form.extracurricular,
        },
      });
      alert("Student added!");
    } catch (error) {
      alert("Error adding student.");
    }
  };

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center min-vh-100"
      style={{ backgroundColor: "rgb(70, 63, 166)" }}
    >
      <div className="w-50 bg-white rounded p-4">
        <h2 className="text-center mb-4">Add Student</h2>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            onChange={handleChange}
            placeholder="Enter student's name"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            onChange={handleChange}
            placeholder="Enter student's email"
          />
        </div>

        {[
          "classAttendance",
          "quiz",
          "assignment",
          "participation",
          "extracurricular",
        ].map((field) => (
          <div key={field} className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              name={field}
              onChange={handleChange}
            />
            <label className="form-check-label">{field}</label>
          </div>
        ))}

        <div className="d-flex justify-content-between">
          <button className="btn btn-success" onClick={handleSubmit}>
            Add Student
          </button>
          <Link to="/admin-dashboard" className="btn btn-primary">
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AddStudent;
