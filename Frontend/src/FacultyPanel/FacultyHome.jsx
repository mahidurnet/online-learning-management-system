import React, { useState, useEffect } from 'react';
import FacultyClassroom from './FacultyClassroom';
import { AiFillDelete } from 'react-icons/ai';
import Swal from 'sweetalert2';

export default function FacultyHome() {
  const [classroom, setClassroom] = useState([]);
  const [activeClassroomId, setActiveClassroomId] = useState(null);
  const [facultyHomeVisible, setFacultyHomeVisible] = useState(true);
  const [classroomData, setClassroomData] = useState(null); // Add state for classroomData


  useEffect(() => {
    fetch('http://localhost:5000/createclassroom', { credentials: 'include' })
      .then((response) => {
        if (!response.ok) {
          throw Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setClassroom(data);
      })
      .catch((error) => {
        console.error('Error fetching classrooms:', error);
      });
  },);
  

  const handleClassroomClick = (classroomId) => {
    setActiveClassroomId(classroomId);

    // Find the corresponding classroomData
    const selectedClassroomData = classroom.find((c) => c._id === classroomId);
    setClassroomData(selectedClassroomData);

    setFacultyHomeVisible(false); // Hide FacultyHome when a box is clicked
  };

 

const handleDeleteClick = async (classroomId) => {
  console.log('Deleting classroom with ID:', classroomId);
  
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        console.log('Deleting classroom...');

        await fetch(`http://localhost:5000/createclassroom/classroom/${classroomId}`, {
          method: 'DELETE',
          credentials: 'include',
        });

        // Update the state to reflect the deletion
        setClassroom((prevClassrooms) => prevClassrooms.filter((c) => c._id !== classroomId));

        // Reset activeClassroomId and classroomData
        setActiveClassroomId(null);
        setClassroomData(null);

        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting classroom:', error);
      }
    }
  });
};




  return (
    <div className="faculty-box-container">

      {facultyHomeVisible &&
        classroom.map((classroom) => (
          <div key={classroom._id}>
            <div className="class-box" >
              <div className='delete-btn-div'>
                <AiFillDelete className="delete-btn-class" onClick={() => handleDeleteClick(classroom._id)} />
              </div>
              <div className="text">
                <h2 className="topic-heading" onClick={() => handleClassroomClick(classroom._id)}>{classroom.cId}</h2>
                <h2 className="topic">{classroom.section}</h2>
                <h2 className="topic">{classroom.faculty}</h2>
              </div>
            </div>
          </div>

        ))}

{activeClassroomId && (
        <FacultyClassroom classroomId={activeClassroomId} classroomData={classroomData} />
      )}
    </div>
  );
}

