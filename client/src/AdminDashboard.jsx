import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Make sure Link is imported here
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/users');
      setUsers(res.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await axios.delete(`http://localhost:5000/users/${id}`);
        fetchUsers(); // Refresh the list after deletion
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

  const calculateGradePercentage = (grades) => {
    const totalCriteria = 5;
    const passed = Object.values(grades).filter(Boolean).length;
    return `${(passed / totalCriteria) * 100}%`;
  };

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center min-vh-100"
      style={{ backgroundColor: 'rgb(70, 63, 166)' }}
    >
      <div className='w-75 bg-white rounded p-3'>
        <div className="d-flex justify-content-between mb-3">
          <h3>Admin Dashboard</h3>
          <Link to="/add-student" className='btn btn-success'>Add Student +</Link>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Grade</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user) => {
                return (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{calculateGradePercentage(user.grades)}</td>
                    <td>
                      <Link to={`/update/${user._id}`} className='btn btn-warning'>Update</Link>
                      <button className='btn btn-danger' onClick={() => handleDelete(user._id)}>Delete</button>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
        {/* Button to go back to the homepage */}
        <div className="d-flex justify-content-center mt-4">
          <Link to="/" className="btn btn-primary">Go to Homepage</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
