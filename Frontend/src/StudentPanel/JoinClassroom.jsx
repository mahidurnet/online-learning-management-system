import React, { useState } from 'react';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const JoinClassroom= () => {
  const [formData, setFormData] = useState({
    code: '',
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     fetch('http://localhost:5000/createjoinclassroom/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials:"include"
      });

      if (response.ok) {
        toast('Waiting for Admin Aprove');
        // You can also redirect the user to a different page upon successful registration
        
      }
    } catch (error) {
      console.error('Error Code:', error);
      toast.success('Waiting for Admin Aprove');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Join Classroom</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Join Code:</label>
          <input
            type="text"
            className="form-control"
            name="code"
            value={formData.code}
            onChange={handleChange}
            required
          />
        </div>
        {/* <div className="mb-3">
          <label className="form-label">Section:</label>
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
          <label className="form-label">Faculty Name:</label>
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
          <label className="form-label">Code:</label>
          <input
            type="text"
            className="form-control"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div> */}
        <button type="submit" className="crt-rm-btn">
          Join
        </button>
      </form>
    </div>
  );
};

export default JoinClassroom;
