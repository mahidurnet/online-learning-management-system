// Coursestable.js
import { useState, useEffect } from 'react';
import AddStudent from '../CreateUpdate/AddStudent';
import UpdateStudent from '../CreateUpdate/UpdateStudent';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { MdAddPhotoAlternate } from "react-icons/md";
import Swal from 'sweetalert2'
export default function Studenttable() {

  const [student, setStudent] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/createstudent/allstudent', { credentials: 'include' })
      .then((response) => response.json())
      .then((data) => {
        setStudent(data);
        // console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching student:', error);
      });
  },);
  const handlePhotoUpload = async (e, studentId) => {
    const file = e.target.files[0];
    console.log(`Uploading photo for student ID: ${studentId}`);
    console.log(file);

    const formData = new FormData();
    formData.append('studentPhoto', file);

    try {
      const response = await fetch(`http://localhost:5000/createstudent/upload-photo/${studentId}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Photo uploaded successfully');
        // Optionally, update the state or perform any action upon successful upload
      } else {
        console.error('Failed to upload photo');
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  };



  const handleDeleteClick = (studentId) => {
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
        fetch(`http://localhost:5000/createstudent/student/${studentId}`, {
          method: 'DELETE',
          credentials: 'include',
        })
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })

      .then((response) => {
        console.log(response)
        if (response.status === 200) {

          // Course deleted successfully, update your local state to reflect the change
          const updatedStudent = student.filter((student) => student._id !== studentId);
          setStudent(updatedStudent);
        }

      })

  };
  return (
    <>
      <div className="report-container">
        <div className="report-header">
          <h2>Student</h2>
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
              <AddStudent />
            </div>
          </div>
        </div>

        <div className="report-body">
          <div className="report-topic-heading">
            <h3>StudentID</h3>
            <h3>Std_Name</h3>
            <h3>Email</h3>
            <h3>Phone</h3>
            <h3>Action</h3>
            <h3>Photo</h3>
          </div>

          {student.map((student) => (
            <div className="items" key={student._id}>
              <div className="item1">
                <h4>{student.sId}</h4>
                <h4>{student.stdname}</h4>
                <h4>{student.email}</h4>
                <h4>{student.mobile}</h4>
               
                <div className="action-buttons">
                  <label htmlFor={`upload-photo-${student._id}`} className="upload-photo-button">
                    <MdAddPhotoAlternate className='update-btn'  />
                  </label>
                  <a href={`#popup2-${student._id}`}>
                    <AiFillEdit className='update-btn' />
                  </a>
                  <AiFillDelete className="delete-btn" onClick={() => handleDeleteClick(student._id)} />

                  <input
                    id={`upload-photo-${student._id}`}
                    type="file"
                    className="upload-photo-input"
                    accept="image/*"
                    onChange={(e) => handlePhotoUpload(e, student._id)}
                    style={{ display: 'none' }}
                  />
                </div>
                {student.photo && (
                  <img
                    src={`http://localhost:5000/${student.photo}`}
                    alt="student"
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%', // Makes the image circular
                      objectFit: 'cover', // Ensures the image covers the entire container
                    }}
                  />
                )}
              </div>
              <div id={`popup2-${student._id}`} className="overlay">
                <div className="popup">
                  <a className="close" href="#">&times;</a>
                  <a className="close" href={`#popup2-${student._id}`}></a>
                  <div className="content">
                    <UpdateStudent studentId={student._id} studentData={student} />
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
