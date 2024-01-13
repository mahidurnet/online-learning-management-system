import React, { useState, useEffect } from 'react';
import StudentClassroom from './StudentClassroom';

export default function FacultyHome() {
  const [classroom, setClassroom] = useState([]);
  const [activeClassroomId, setActiveClassroomId] = useState(null);
  const [studentHomeVisible, setStudentHomeVisible] = useState(true);
  const [classroomData, setClassroomData] = useState(null); // Add state for classroomData


useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/createjoinclassroom', { credentials: 'include' });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setClassroom(data);
      console.log(data)
    } catch (error) {
      console.error('Error fetching classrooms:', error);
    }
  };

  fetchData();
}, []); // Make sure to pass an empty dependency array to run the effect only once on mount

  

  const handleClassroomClick = (classroomId) => {
    setActiveClassroomId(classroomId);

    // Find the corresponding classroomData
    const selectedClassroomData = classroom.find((c) => c._id === classroomId);
    setClassroomData(selectedClassroomData);

    setStudentHomeVisible(false); // Hide FacultyHome when a box is clicked
  };

 






  return (
    <div className="faculty-box-container">

      {studentHomeVisible &&
        classroom.map((classroom) => (
          <div key={classroom._id}>
            <div className="class-box" >
              
              <div className="text">
                <h2 className="topic-heading" onClick={() => handleClassroomClick(classroom._id)}>{classroom.cId}</h2>
                <h2 className="topic">{classroom.section}</h2>
                <h2 className="topic">{classroom.faculty}</h2>
              </div>
            </div>
          </div>

        ))}

{activeClassroomId && (
        <StudentClassroom classroomId={activeClassroomId} classroomData={classroomData} />
      )}
    </div>
  );
}

