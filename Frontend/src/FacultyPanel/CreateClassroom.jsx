import React, { useState } from 'react';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateClassroom= () => {
  const [formData, setFormData] = useState({
    cId: '',
    section: '',
    faculty: '',
    code: '',
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const response = await fetch('http://localhost:5000/createclassroom', {
        method: 'POST',
        credentials:'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        
      });

      if (response.ok) {
        toast.success('Class Create successfully');
        // You can also redirect the user to a different page upon successful registration
        
      }
    } catch (error) {
      console.error('Something Wrong :', error);
      toast.success('Class Create  successfully');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create Classroom</h2>
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
          <label className="form-label">Faculty Name:</label>
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
          <label className="form-label">Code:</label>
          <input
            type="text"
            className="form-control"
            name="code"
            value={formData.code}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="crt-rm-btn">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateClassroom;
