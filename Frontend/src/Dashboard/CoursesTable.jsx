// Coursestable.js

import RegisterCourse from '../CreateUpdate/RegisterCourse';
import { useState, useEffect } from 'react';
import UpdateCourse from '../CreateUpdate/UpdateCourse';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import Swal from 'sweetalert2'

export default function Coursestable() {
  // const [displayCreateOptions, setDisplayCreateOptions] = useState(false);
  // const [displayCourseOptions, setDisplayCourseOptions] = useState(false);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/createcourse/allcourses', { credentials: 'include' })
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
        // console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
  },);

  const handleDeleteClick = (courseId) => {
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
        fetch(`http://localhost:5000/createcourse/courses/${courseId}`, {
          method: 'DELETE',
          credentials: 'include',
        })
        setLara(!lara)
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
      .then((response) => {
        if (response.status === 200) {
          // Course deleted successfully, update your local state to reflect the change
          const updatedCourses = courses.filter((course) => course._id !== courseId);
          setCourses(updatedCourses);
        }
      })
  };
  return (
    <>
      <div className="report-container">
        <div className="report-header">
          <h2>Courses</h2>
          <div className="view">
            <a href="#popup1">
              <button className="view">Create</button>
            </a>
          </div>
        </div>
        <div id="popup1" className="overlay">
          <div className="popup">
            <a className="close" href="#">&times;</a>
            <div className="content">
              <RegisterCourse />
            </div>
          </div>
        </div>

        <div className="report-body">
          <div className="report-topic-heading">
            <h3>CourseID </h3>
            
            <h3>Faculty</h3>
            <h3>Section</h3>
            <h3>Time</h3>
            <h3>Action</h3>
          </div>
          {courses.map((course) => (
            <div className="items" key={course._id}>
              <div className="item1">
                <h4 >{course.cId}</h4>
                <h4> {course.faculty}</h4>
                <h4> {course.section}</h4>
                <h4>{course.time}</h4>
                <div className="action-buttons">
                  <a href={`#popup2-${course._id}`}>
                    <AiFillEdit className='update-btn' />

                  </a>
                  <AiFillDelete className="delete-btn" onClick={() => handleDeleteClick(course._id)} />

                </div>
              </div>
              <div id={`popup2-${course._id}`} className="overlay">
                <div className="popup">
                  <a className="close" href="#">&times;</a>
                  <a className="close" href={`#popup2-${course._id}`}></a>
                  <div className="content">

                    <UpdateCourse courseId={course._id} courseData={course} />
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
