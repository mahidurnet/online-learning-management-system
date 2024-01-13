import React, { useState } from 'react';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateFaculty = ({facultyId ,facultyData}) => {
  const [formData, setFormData] = useState({
    fId: facultyData.fId|| '',
    fname: facultyData.fname||'',
    email: facultyData.email||'',
    phone: facultyData.phone|| '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(formData)
      const response = await fetch(`http://localhost:5000/createfaculty/updatefaculty/${facultyId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials:"include"
      });

      if (response.status === 200) {
        toast('faculty updated successfully');
        // You can also redirect the user to a different page upon successful registration
      }
    } catch (error) {
      console.error('Error adding faculty:', error);
      toast('Failed to add faculty');
    }
    
  };

  return (
    <div className="container mt-5">
      <h2>Update Faculty</h2>
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
            value={formData.fname}
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
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="crt-rm-btn">
          Update Faculty
        </button>
      </form>
    </div>
  );
};

export default UpdateFaculty ;
