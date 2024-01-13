import React, { useState, useEffect } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { MdAddPhotoAlternate } from "react-icons/md";
import Swal from 'sweetalert2';
import AddFaculty from '../CreateUpdate/AddFaculty';
import UpdateFaculty from '../CreateUpdate/UpdateFaculty';

export default function Facultytable() {
  const [faculty, setFaculty] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/createfaculty/allfaculty', { credentials: 'include' })
      .then((response) => response.json())
      .then((data) => {
        setFaculty(data);
      })
      .catch((error) => {
        console.error('Error fetching faculty:', error);
      });
  }, );

  const handlePhotoUpload = async (e, facultyId) => {
    const file = e.target.files[0];
    console.log(`Uploading photo for faculty ID: ${facultyId}`);
    console.log(file);
  
    const formData = new FormData();
    formData.append('facultyPhoto', file);
  
    try {
      const response = await fetch(`http://localhost:5000/createfaculty/upload-photo/${facultyId}`, {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        console.log('Photo uploaded successfully');
        // Update the faculty state with the new photo
        const updatedFaculty = faculty.map((item) => {
          if (item._id === facultyId) {
            return { ...item, photo: file.name }; // Assuming 'file.name' is the photo's filename
          }
          return item;
        });
        setFaculty(updatedFaculty);
      } else {
        console.error('Failed to upload photo');
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  };
  


  const handleDeleteClick = (facultyId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/createfaculty/faculty/${facultyId}`, {
          method: 'DELETE',
          credentials: 'include',
        }).then((response) => {
          if (response.status === 200) {
            const updatedFaculty = faculty.filter((faculty) => faculty._id !== facultyId);
            setFaculty(updatedFaculty);
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
          }
        });
      }
    });
  };

  return (
    <>
      <div className="report-container">
        <div className="report-header">
          <h2>Faculty</h2>
          <div className="view">
            <a href="#popup1">
              <button className="view">Add</button>
            </a>
          </div>
        </div>
        <div id="popup1" className="overlay">
          <div className="popup">
            <a className="close" href="#">&times;</a>
            <div className="content">
              <AddFaculty />
            </div>
          </div>
        </div>

        <div className="report-body">
          <div className="report-topic-heading">
            <h3>ID</h3>
            <h3>Name</h3>
            <h3>Email</h3>
            <h3>Phone</h3>
            <h3>Action</h3>
            <h3>Photo</h3>
          </div>

          {faculty.map((faculty) => (
            <div className="items" key={faculty._id}>
              <div className="item1">

                <h4>{faculty.fId}</h4>
                <h4>{faculty.fname}</h4>
                <h4>{faculty.email}</h4>
                <h4>{faculty.phone}</h4>
               
                <div className="action-buttons">
                <label htmlFor={`upload-photo-${faculty._id}`} className="upload-photo-button">
                    <MdAddPhotoAlternate className='update-btn' />
                  </label>
                  <a href={`#popup2-${faculty._id}`}>
                    <AiFillEdit className='update-btn' />
                  </a>
                  
                  <AiFillDelete className="delete-btn" onClick={() => handleDeleteClick(faculty._id)} />
                 
                  <input
                    id={`upload-photo-${faculty._id}`}
                    type="file"
                    className="upload-photo-input"
                    accept="image/*"
                    onChange={(e) => handlePhotoUpload(e, faculty._id)}
                    style={{ display: 'none' }}
                  />
                </div>
                {faculty.photo && (
                  <img
                    src={`http://localhost:5000/${faculty.photo}`}
                    alt="Faculty"
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%', // Makes the image circular
                      objectFit: 'cover', // Ensures the image covers the entire container
                    }}
                  />
                )}
              </div>
              <div id={`popup2-${faculty._id}`} className="overlay">
                <div className="popup">
                  <a className="close" href="#">&times;</a>
                  <a className="close" href={`#popup2-${faculty._id}`}></a>
                  <div className="content">
                    <UpdateFaculty facultyId={faculty._id} facultyData={faculty} />
                  </div>
                </div>
              </div>
            </div>

          ))}
        </div>
      </div>
    </>
  );
}
