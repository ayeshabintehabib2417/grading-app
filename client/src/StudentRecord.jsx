import { React, useState, useEffect } from 'react';
import axios from 'axios';
import './StudentRecord.css';  // Make sure to link your CSS file here

function StudentRecord() {
  const [student, setStudent] = useState(null);
  const email = localStorage.getItem("studentEmail");

  useEffect(() => {
    axios.get(`http://localhost:5000/users/${email}`).then(res => setStudent(res.data));
  }, []);

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center min-vh-100"
      style={{ backgroundColor: 'rgb(70, 63, 166)' }}
    >
      <div className="student-record-container">
        <h2 className="student-record-title">My Grades</h2>
        {student ? (
          <ul className="grades-list">
            {Object.entries(student.grades).map(([key, value]) => (
              <li className="grade-item" key={key}>
                <span className="grade-key">{key}: </span>
                <span className={`grade-value ${value ? 'pass' : 'fail'}`}>
                  {value ? "✅" : "❌"}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="loading-text">Loading...</p>
        )}
      </div>
    </div>
  );
}

export default StudentRecord;
