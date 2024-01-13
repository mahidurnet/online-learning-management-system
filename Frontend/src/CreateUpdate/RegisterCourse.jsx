import React, { useState } from 'react';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterCourse = () => {
  const [formData, setFormData] = useState({
    cId: '',
    faculty: '',
    section: '',
    time: '',
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/createcourse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
  
      if (response.ok) {
        toast.success('Course registered successfully');
        // Optionally, you can redirect the user to a different page upon successful registration
      } else {
        if (response.status === 409) {
          toast.error('Time Conflict. Course with the same time already exists');
        } else {
          toast.error('Time Conflict');
        }
      }
    } catch (error) {
      console.error('Error registering course:', error);
      toast.error('Error registering course');
    }
  };
  
  
  

  return (
    <div className="container mt-5">
      <h2>Register a New Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Course ID:</label>
          <input
            type="text"
            className="form-control"
            name="cId"
            value={formData.cId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Faculty:</label>
          <input
            type="text"
            className="form-control"
            name="faculty"
            value={formData.faculty}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Section:</label>
          <input
            type="text"
            className="form-control"
            name="section"
            value={formData.section}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Time:</label>
          <input
            type="text"
            className="form-control"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="crt-rm-btn">
          Register Course
        </button>
      </form>
    </div>
  );
};

export default RegisterCourse;
