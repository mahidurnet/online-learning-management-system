// import "../src/dash.css"
import React, { useEffect, useState } from 'react';
export default function DashboardOverview()
{
  const [studentCount, setStudentCount] = useState(0); // State to store student count
  const [facultyCount, setFacultyCount] = useState(0); // State to store student count
  const [courseCount, setCourseCount] = useState(0); 

  // Fetch student count from the server
  useEffect(() => {
    fetch('http://localhost:5000/createdashboardoverview/student/count', { credentials: 'include' })
      .then((response) => response.json())
      .then((data) => {
        setStudentCount(data.count);
      })
      .catch((error) => {
        console.error('Error fetching student count:', error);
      });
  }, []); // Update when studentCount changes

  useEffect(() => {
    fetch('http://localhost:5000/createdashboardoverview/faculty/count', { credentials: 'include' })
      .then((response) => response.json())
      .then((data) => {
        setFacultyCount(data.count);
      })
      .catch((error) => {
        console.error('Error fetching student count:', error);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/createdashboardoverview/course/count', { credentials: 'include' })
      .then((response) => response.json())
      .then((data) => {
        setCourseCount(data.count);
      })
      .catch((error) => {
        console.error('Error fetching student count:', error);
      });
  }, []); 

    return(
        <>
                  <div className="box-container">
            <div className="box box1" >
              <div className="text">
                <h2 className="topic-heading">{courseCount}</h2>
                <h2 className="topic" >Courses</h2>
              </div>
            </div>

            <div className="box box2">
              <div className="text">
                <h2 className="topic-heading">{facultyCount}</h2>
                <h2 className="topic">Faculty</h2>
              </div>
            </div>

            <div className="box box3">
              <div className="text">
                <h2 className="topic-heading">{studentCount}</h2>
                <h2 className="topic">Student</h2>
              </div>
            </div>
              </div>
        </>
    )
}
