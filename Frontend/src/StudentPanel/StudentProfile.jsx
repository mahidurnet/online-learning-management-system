import { useEffect, useState } from 'react';

export default function StudentProfile() {
    const [student, setstudent] = useState([]);
  
    useEffect(() => {
        fetch('http://localhost:5000/studentprofile', { credentials: 'include' })
        .then((response) => {
          if (!response.ok) {
            console.error('Network response was not ok:', response.status);
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setstudent(data);
        })
        .catch((error) => {
          console.error('Error fetching student data:', error);
        });
      },[])        
      

    return(
    
      <div className="address-card">
      <h1>Student Information</h1>
      <div className="teacher-details">
      <div className='profile-photo-f'>
      {student.photo && (
      <img
        src={`http://localhost:5000/${student.photo}`}
        alt="student"
        style={{
          width: '200px',
          height: '200px',
          borderRadius: '50%', // Makes the image circular
          objectFit: 'cover', // Ensures the image covers the entire container
        }}
      />
    )}
    </div>
          <div className="teacher-info">
              {/* <h2>Teacher Name</h2> */}
              <h3>   ID: {student.sId}</h3>
              <h3> Name: {student.stdname}</h3>
              <h3>Email: {student.email}</h3>
              <h3>Phone: {student.mobile}</h3>
              
          </div>
      </div>
  </div>
       
        
    )
}