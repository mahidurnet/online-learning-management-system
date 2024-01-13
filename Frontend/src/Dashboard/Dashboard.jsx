import StudentTable from './StudentTable';
import FacultyTable from './FacultyTable';
import DashboardOverview from './DashboardOverview';
import CoursesTable from './CoursesTable';
import StudentRequest from './StudentRequest';
import FacultyRequest from './FacultyRequest';
import './dash.css'
import { useEffect, useState } from 'react';
import ReportTable from './ReportTable';
import { Navigate } from 'react-router-dom';
import { MdDashboard } from 'react-icons/md';
import { BsFillBookFill } from 'react-icons/bs';
import { GiTeacher } from 'react-icons/gi';
import { PiStudentBold } from 'react-icons/pi';
import { BiSolidReport, BiSolidLogOut } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaBars, FaSearch } from "react-icons/fa";
import { IoMdGitPullRequest } from "react-icons/io";



export default function Dashboard() {
  const [displayReportOption, setDisplayReportOption] = useState(false)
  const [displayStudentoption, setDisplayStudentOption] = useState(false)
  const [displayFacultyOption, setDisplayFacultyOption] = useState(false)
  const [displayCourseOptions, setDisplayCourseOptions] = useState(false);
  const [displayStudentRequest, setDisplayStudentRequest] = useState(false);
  const [displayTeacherRequest, setDisplayTeacherRequest] = useState(false);
  const [displayDashboardOptions, setDisplayDashboardOptions] = useState(true);
  const navigate = useNavigate();

  function handleCoursesClick(e) {
    e.preventDefault();
    setDisplayCourseOptions(true);
    setDisplayDashboardOptions(false);
    setDisplayFacultyOption(false);
    setDisplayStudentOption(false);
    setDisplayReportOption(false);
    setDisplayStudentRequest(false);
    setDisplayTeacherRequest(false);


  }
  function handleDashboardClick(e) {
    e.preventDefault();
    setDisplayDashboardOptions(true);
    setDisplayCourseOptions(false);
    setDisplayFacultyOption(false);
    setDisplayStudentOption(false);
    setDisplayReportOption(false)
    setDisplayStudentRequest(false);
    setDisplayTeacherRequest(false);


  }
  function handleFacultyClick(e) {
    e.preventDefault();
    setDisplayFacultyOption(true);
    setDisplayCourseOptions(false);
    setDisplayDashboardOptions(false);
    setDisplayStudentOption(false);
    setDisplayReportOption(false)
    setDisplayStudentRequest(false);
    setDisplayTeacherRequest(false);

  }
  function handleStudentClick(e) {
    e.preventDefault();
    setDisplayStudentOption(true);
    setDisplayFacultyOption(false);
    setDisplayCourseOptions(false);
    setDisplayDashboardOptions(false);
    setDisplayReportOption(false)
    setDisplayStudentRequest(false);
    setDisplayTeacherRequest(false);

  }
  function handleReportClick(e) {
    e.preventDefault;
    setDisplayReportOption(true)
    setDisplayStudentOption(false);
    setDisplayFacultyOption(false);
    setDisplayCourseOptions(false);
    setDisplayDashboardOptions(false);
    setDisplayStudentRequest(false);
    setDisplayTeacherRequest(false);

  }
  function handleRequestClick(role) {
    if (role === 'student') {
      setDisplayStudentRequest(true);
      setDisplayTeacherRequest(false);
    } else if (role === 'teacher') {
      setDisplayStudentRequest(false);
      setDisplayTeacherRequest(true);
    }
    setDisplayReportOption(false)
    setDisplayStudentOption(false);
    setDisplayFacultyOption(false);
    setDisplayCourseOptions(false);
    setDisplayDashboardOptions(false);
  }





  function handleLogout(e) {
    e.preventDefault();
    console.log("Logging out...");
    fetch('http://localhost:5000/logout/admin', {
      credentials: 'include',
    })
      .then(response => {
        console.log("Response status:", response.status);
        if (response.status === 200) {
          toast.success('Logged out successfully');
          // Clear localStorage on successful logout
          localStorage.removeItem("admin");
          // Redirect to the login page
          window.location.href = '/'; // Redirect to the login page
        } else {
          console.log('Failed to log out');
        }
      })
      .catch(error => {
        console.error('An error occurred:', error);
      });
  }
  



  useEffect(() => {
    // Add the class to the body element when the component mounts
    document.body.classList.add('body-class');

    // Remove the class when the component unmounts
    return () => {
      document.body.classList.remove('body-class');

    };
  },);

  const [isClick, setIsClick] = useState(false);

  const [isHovered, setIsHovered] = useState(false);
  // Event handlers
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };



  return (
    <>
      <div>
        <header>

          <div className="logo">Admin</div>

          <div className='mobile-logo'><FaBars className='bar' onClick={() => setIsClick(!isClick)} />Admin</div>


        </header>

        <div className="main-container">
          {/* desktop nav */}
          <div className="navcontainer">
            <nav className="nav">
              <div className="nav-upper-options">
                <div className="nav-option option1" onClick={handleDashboardClick}>
                  <MdDashboard />
                  <h3>Dashboard </h3>
                </div>

                <div className="option2 nav-option" id="courses-tab" onClick={handleCoursesClick}>
                  <BsFillBookFill />
                  <h3>Courses</h3>
                </div>
                <div className="option2 nav-option" onClick={handleFacultyClick}>
                  <GiTeacher />
                  <h3>Faculty</h3>
                </div>

                <div className="option2 nav-option" onClick={handleStudentClick}>
                  <PiStudentBold />
                  <h3>Student</h3>
                </div>
                <div className="nav-option option3" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                  <IoMdGitPullRequest />
                  <h3 >Request</h3>
                  <div className={isHovered ? "sub-show" : "sub-hidden"}>
                    <p className='sub-menu' onClick={() => handleRequestClick('student')}>Student</p>
                    <p className="sub-menu" onClick={() => handleRequestClick('teacher')}>Teacher</p>
                  </div>
                </div>

                <div className="nav-option option3" onClick={handleReportClick}>
                  <BiSolidReport />
                  <h3>Report</h3>
                </div>

                <div className="nav-option option4" onClick={handleLogout}>

                  <BiSolidLogOut />
                  <h3 >Logout</h3>

                </div>
              </div>
            </nav>
          </div>
          {/* mobile nav */}
          <nav className={`mobile-nav ${isClick !== true && "mobile-nav-positon"}`}>
            <div className="nav-option option1" onClick={handleDashboardClick}>
              <MdDashboard />
              <h3>Dashboard </h3>
            </div>

            <div className="option2 nav-option" id="courses-tab" onClick={handleCoursesClick}>
              <BsFillBookFill />
              <h3>Courses</h3>
            </div>
            <div className="option2 nav-option" onClick={handleFacultyClick}>
              <GiTeacher />
              <h3>Faculty</h3>
            </div>

            <div className="option2 nav-option" onClick={handleStudentClick}>
              <PiStudentBold />
              <h3>Student</h3>
            </div>

            <div className="nav-option option3" onClick={handleReportClick}>
              <BiSolidReport />
              <h3>Report</h3>
            </div>

            <div className="nav-option option4" onClick={handleLogout}>

              <BiSolidLogOut />
              <h3 >Logout</h3>

            </div>
          </nav>
          <div className="main">

            {displayDashboardOptions && <DashboardOverview />}
            {displayCourseOptions && <CoursesTable />}
            {displayFacultyOption && <FacultyTable />}
            {displayStudentoption && <StudentTable />}
            {displayReportOption && <ReportTable />}
            {displayStudentRequest && <StudentRequest />}
            {displayTeacherRequest && <FacultyRequest />}


          </div>
        </div>
      </div>


    </>
  )
}
