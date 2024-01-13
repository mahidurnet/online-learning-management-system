import React, { useState, useEffect } from 'react';
import { RiCheckLine, RiCloseLine } from 'react-icons/ri';
import Swal from 'sweetalert2'

export default function FacultyRequest() {
  const [filesData, setFilesData] = useState([]);
  const handleAcceptClick = async (fileid, classroomId, filename, participantId) => {
    try {
      const response = await fetch(`http://localhost:5000/createfacultyclassroom/${classroomId}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileid: fileid,
          filename: filename,
          participantId: participantId,
        }),
      });
  
      if (response.ok) {
        // Remove the accepted file from filesData state
        setFilesData((prevFilesData) => prevFilesData.filter((file) => file._id !== fileid));
      } else {
        throw new Error('Error accepting student');
      }
    } catch (error) {
      console.error('Error accepting student:', error);
    }
  };
 const handleDeleteClick = async (fileid, classroomId, filename, participantId) => {
  try {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      const response = await fetch(`http://localhost:5000/createfacultyclassroom/${classroomId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileid: fileid,
          filename: filename,
          participantId: participantId,
        }),
      });

      if (response.ok) {
        // If deletion is successful, remove the file from state and show success message
        setFilesData((prevFilesData) => prevFilesData.filter((file) => file._id !== fileid));
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      } else {
        throw new Error('Error deleting files');
      }
    }
  } catch (error) {
    console.error('Error deleting files', error);
  }
};

  useEffect(() => {
    const fetchFilesData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/createfacultyclassroom/pendingFiles`, {
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setFilesData(data || []); // Set filesData state with fetched data
        } else {
          console.error('Failed to fetch files data');
        }
      } catch (error) {
        console.error('Error fetching files data:', error);
      }
    };

    fetchFilesData();
  }, []);
    

  return (
    <div className="report-body">
      <div className="report-topic-heading-request">
        <h3>FacultyID</h3>
        <h3>Faculty Name</h3>
        <h3>Content</h3>
        <h3>Action</h3>
      </div>

      {filesData.map((file) => (
        <div className="items" key={file.participantId}>
          <div className="request">
            <h4>{file.facultyId}</h4>
            <h4>{file.facultyname}</h4>
            <div>
              {/* <p>{file.filename}</p> */}
              {/* Render content based on file type */}
              {file.filename.endsWith('.pdf') ? (
                <a href={`http://localhost:5000/${file.filename}`} target="_blank" rel="noopener noreferrer">
                  PDF: {file.filename}
                </a>
              ) : file.filename.endsWith('.mp4') ? (
                <video width="200px" height="200px" controls>
                  <source src={`http://localhost:5000/${file.filename}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : file.filename.endsWith('.jpg') || file.filename.endsWith('.png') ? (
                <img
                  src={`http://localhost:5000/${file.filename}`}
                  // alt={file.filename}
                  style={{ maxWidth: '200px', maxHeight: '200px' }}
                />
              ) : (
                <p>File: {file.filename}</p>
              )}
                <p>{file.text}</p>
            </div>
            <div className="action-buttons">
              <RiCheckLine className='update-btn' onClick={() => handleAcceptClick(file._id, file.classroomId, file.filename, file.participantId)}/>
              <RiCloseLine className="delete-btn" onClick={() => handleDeleteClick(file._id, file.classroomId, file.filename, file.participantId)}/> 
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
