import React, { useState, useEffect } from 'react';
import { RiCheckLine, RiCloseLine } from 'react-icons/ri';
import Swal from 'sweetalert2'

export default function StudentRequest() {
  const [pendingStudents, setPendingStudents] = useState([]);
  // Define handleAcceptClick and handleDeleteClick functions
  const handleAcceptClick = (studentId, classroomId) => {
    console.log(studentId, classroomId)
    fetch(`http://localhost:5000/createjoinclassroom/${classroomId}/${studentId}`, {
      method: 'POST',
      credentials: 'include'
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error accepting student');
        }
      })
      .catch((error) => {
        console.error('Error accepting student:', error);
      });
  };

  const handleDeleteClick = (studentId, classroomId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/createjoinclassroom/${classroomId}/${studentId}`, {
          method: 'DELETE',
          credentials: 'include' 
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Error deleting student request');
            }
            // If deletion is successful, update the state to reflect the changes
            setPendingStudents(prevStudents =>
              prevStudents.filter(student => student._id !== studentId)
            );
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          })
          .catch((error) => {
            console.error('Error deleting student request:', error);
          });
      }
    });
  };
  


  useEffect(() => {
    // Fetch pending student data from your API endpoint
    fetch('http://localhost:5000/createjoinclassroom/pending-requests', {
      credentials: 'include'
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setPendingStudents(data); // Set the received data directly to pendingStudents
      })
      .catch((error) => {
        console.error('Error fetching pending students:', error);
      });
  }, );

  return (
    <div className="report-body">
      <div className="report-topic-heading">
        <h3>Student ID</h3>
        <h3>Student Name</h3>
        <h3>Course</h3>
        <h3>Faculty</h3>
        <h3>Action</h3>
      </div>

      {pendingStudents.map((student) => (
        <div className="items" key={student._id}>
          <div className="item1">
            <h4>{student.student.sId}</h4>
            <h4>{student.student.stdname}</h4>
            <h4>{student.classroom.cId}</h4>
            <h4>{student.classroom.faculty}</h4>
            
            <div className="action-buttons">

              <RiCheckLine className='update-btn' onClick={() => handleAcceptClick(student.student._id, student.classroom._id)} />
              <RiCloseLine className="delete-btn" onClick={() => handleDeleteClick(student.student._id, student.classroom._id)}/> 

            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
