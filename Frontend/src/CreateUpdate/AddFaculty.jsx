import React, { useState } from 'react';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddFaculty = () => {
  const [formData, setFormData] = useState({
    fId: '',
    fname: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/createfaculty', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success('Faculty added successfully');
      } else {
        if (response.status === 409) {
          toast.error('ID conflict. Faculty with the same ID already exists');
        } else {
          toast.error('Faild to add faculty');
        }
      }
    } catch (error) {
      toast.error('Failed to add faculty');
    }
  };
  

  return (
    <div className="container mt-5">
      <h2> Add Faculty</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Faculty ID:</label>
          <input
            type="text"
            className="form-control"
            name="fId"
            value={formData.fId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">FacultyName:</label>
          <input
            type="text"
            className="form-control"
            name="fname"
            value={formData.faculty}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
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
            name="phone"
            value={formData.phone}
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
          Add Faculty
        </button>
      </form>
    </div>
  );
};

export default AddFaculty;
