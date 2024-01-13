import { useEffect, useState } from 'react';

export default function FacultyProfile() {
    const [faculty, setfaculty] = useState([]);
  
    useEffect(() => {
        fetch('http://localhost:5000/facultyprofile', { credentials: 'include' })
        .then((response) => {
          if (!response.ok) {
            console.error('Network response was not ok:', response.status);
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setfaculty(data);
        })
        .catch((error) => {
          console.error('Error fetching faculty data:', error);
        });
      },[])   
           
      

    return(
    
      <div className="address-card">
      <h1>Teacher Information</h1>
      <div className="teacher-details">
        <div className='profile-photo-f'>
      {faculty.photo && (
      <img
        src={`http://localhost:5000/${faculty.photo}`}
        alt="Faculty"
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
              <h3>ID: {faculty.fId}</h3>
              <h3>Name: {faculty.fname}</h3>
              <h3>Email: {faculty.email}</h3>
              <h3>Phone: {faculty.phone}</h3>
       
              
          </div>
      </div>
  </div>
       
        
    )
}