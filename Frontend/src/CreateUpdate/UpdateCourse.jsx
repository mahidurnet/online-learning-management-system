import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateCourse = ({ courseId, courseData }) => {
  const [formData, setFormData] = useState({
    cId: courseData.cId || '',       // Initialize with courseData values
    faculty: courseData.faculty || '', // Initialize with courseData values
    section: courseData.section || '', // Initialize with courseData values
    time: courseData.time || '',       // Initialize with courseData values
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/createcourse/updatecourse/${courseId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      if (response.status === 200) {
        toast('Course updated successfully');
        // You can also redirect the user to a different page upon successful registration
      }
    } catch (error) {
      console.error('Error updating course:', error);
      toast('Failed to update course');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Update this Course</h2>
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
          Update Course
        </button>
      </form>
    </div>
  );
};

export default UpdateCourse;
