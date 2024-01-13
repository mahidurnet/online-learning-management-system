import React, { useState } from 'react';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UpdateStudent = ({studentId ,studentData}) => {
  const [formData, setFormData] = useState({
    sId: studentData.sId || '',
    stdname: studentData.stdname || '',
    email: studentData.email ||'',
    mobile: studentData.mobile || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(formData)
      const response = await fetch(`http://localhost:5000/createstudent/updatestudent/${studentId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials:"include"
      });

      if (response.status === 200) {
        toast('student updated successfully');
        // You can also redirect the user to a different page upon successful registration
      }
    } catch (error) {
      console.error('Error adding student:', error);
      toast('Failed to add student');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Update Student</h2>
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
            value={formData.stdname}
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
            required
          />
        </div>
        <button type="submit" className="crt-rm-btn">
          Update Student
        </button>
      </form>
    </div>
  );
};

export default UpdateStudent ;
