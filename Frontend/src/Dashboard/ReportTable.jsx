import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';

export default function ReportTable() {
  const [courses, setCourses] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [student, setStudent] = useState([]);

  useEffect(() => {
    // Fetch courses data
    fetch('http://localhost:5000/createcourse/allcourses', { credentials: 'include' })
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });

    // Fetch faculty data
    fetch('http://localhost:5000/createfaculty/allfaculty', { credentials: 'include' })
      .then((response) => response.json())
      .then((data) => {
        setFaculty(data);
      })
      .catch((error) => {
        console.error('Error fetching faculty:', error);
      });
  }, []);
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
  }, );


  const generateCoursesReport = () => {
    // Generate CSV report for courses
    const headersCourses = [
      { label: 'CourseID', key: 'cId' },
      { label: 'Faculty', key: 'faculty' },
      { label: 'Section', key: 'section' },
      { label: 'Time', key: 'time' },
    ];

    const csvReportCourses = {
      data: courses,
      headers: headersCourses,
      filename: 'courses_report.csv',
    };

    return (
      <CSVLink {...csvReportCourses}>
        <button className="download-report"> Courses Report</button>
      </CSVLink>
    );
  };

  const generateFacultyReport = () => {
   
    const headersFaculty = [
      { label: 'FacultyID', key: 'fId' },
      { label: 'F_Name', key: 'fname' },
      { label: 'Email', key: 'email' },
      { label: 'Phone', key: 'phone' },
    ];

    const csvReportFaculty = {
      data: faculty,
      headers: headersFaculty,
      filename: 'faculty_report.csv',
    };

    return (
      <CSVLink {...csvReportFaculty}>
        <button className="download-report"> Faculty Report</button>
      </CSVLink>
    );
  };
  const generateStudentReport = () => {
    // Generate CSV report for faculty
    const headersStudent = [
      { label: 'StudentID', key: 'sId' },
      { label: 'Std_Name', key: 'stdname' },
      { label: 'Email', key: 'email' },
      { label: 'Phone', key: 'mobile' },
    ];

    const csvReportStudent = {
      data: student,
      headers: headersStudent,
      filename: 'student_report.csv',
    };

    return (
      <CSVLink {...csvReportStudent}>
        <button className="download-report"> Student Report</button>
      </CSVLink>
    );
  };

  return (
    <div className="report-container">
      <div className="report-header">
        <h2>Reports</h2>
        {generateCoursesReport()}
        {generateFacultyReport()}
        {generateStudentReport()}
      </div>
      <div className="report-body">
        {/* Render tables or other report contents */}
      </div>
    </div>
  );
}
