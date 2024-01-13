import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddStudent = () => {
  const [formData, setFormData] = useState({
    sId: '',
    stdname: '',
    email: '',
    mobile: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/createstudent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: "include"
      });

      if (response.status === 200) {
        toast.success('Student added successfully');

      }
    } catch (error) {
      toast.error('Id Conflict');
    }
  };

  return (
    <div className="container mt-5">
      <h2> Add Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Student ID:</label>
          <input
            type="text"
            className="form-control"
            name="sId"
            value={formData.sId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">StudentName:</label>
          <input
            type="text"
            className="form-control"
            name="stdname"
            value={formData.student}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="text"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone:</label>
          <input
            type="text"
            className="form-control"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="+8801"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input
            type="text"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="crt-rm-btn">
          Add Student
        </button>
      </form>
    </div>
  );
};

export default AddStudent;
