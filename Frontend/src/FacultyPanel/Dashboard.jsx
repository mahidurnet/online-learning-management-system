import CreateClassroom from './CreateClassroom';
import FacultyProfile from './FacultyProfile';
import FacultyHome from './FacultyHome';
import FacultyClassroom from './FacultyClassroom'
import './facultydash.css';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { BiSolidLogOut } from 'react-icons/bi';
import { AiOutlinePlus, AiFillHome } from 'react-icons/ai';
import { ImProfile } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';



export default function Dashboard() {
  const [displayHomeOptions, setDisplayHomeOptions] = useState(false);
  const [displayProfileOptions, setDisplayProfileOptions] = useState(true);
  const [displayClassroomOptions, setDisplayClassroomOptions] = useState(false);
  const [profile, setProfile] = useState("")
  const navigate = useNavigate();


  function handleHomeClick(e) {
    e.preventDefault();
    setDisplayHomeOptions(true);
    setDisplayProfileOptions(false);
    setDisplayClassroomOptions(false);
    setProfile("profile")
  }
  function handleProfileClick(e) {
    e.preventDefault();
    setDisplayProfileOptions(true);
    setDisplayHomeOptions(false);
    setDisplayClassroomOptions(false);
    setProfile("")
  }
  function handleClassroomClick(e) {
    e.preventDefault();
    setDisplayProfileOptions(false);
    setDisplayHomeOptions(false);
    setDisplayClassroomOptions(true);
    setProfile("")
  }
  function handleLogout(e) {
    e.preventDefault();
    console.log("Logging out...");
    fetch('http://localhost:5000/logout/faculty', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    .then(response => {
      console.log("Response status:", response.status);
      if (response.status === 200) {
        toast.success('Logged out successfully');
        // Clear localStorage on successful logout
        localStorage.removeItem("faculty");
        // Redirect to the login page
        navigate();
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
  return (
    <>
      <div>
        <header>

          <div className="logo">Faculty</div>
          {profile === "profile" && <a href="#popup1">
            <div className='plus_icon'>
              <AiOutlinePlus />
            </div>
          </a>}
          <div id="popup1" className="overlay">
            <div className="popup">
              <a className="close" href="#">&times;</a>
              <div className="content">
                <CreateClassroom />
              </div>
            </div>
          </div>



        </header>

        <div className="main-container">
          <div className="navcontainer">
            <nav className="nav">
              <div className="nav-upper-options">
                <div className="nav-option option1" onClick={handleProfileClick}>
                  <ImProfile />
                  <h3>Profile </h3>
                </div>

                <div className="option2 nav-option" id="courses-tab" onClick={handleHomeClick}>
                  <AiFillHome />
                  <h3>Home</h3>
                </div>
                {/* <div className="option2 nav-option" id="courses-tab" onClick={handleClassroomClick}>
                  <AiFillHome />
                  <h3>classroom</h3>
                </div> */}


                <div className="nav-option option4"  onClick={handleLogout}>

                  <BiSolidLogOut />
                  <h3>Logout</h3>

                </div>
              </div>
            </nav>
          </div>
          <div className="main">

            {displayProfileOptions && <FacultyProfile />}
            {displayHomeOptions && <FacultyHome />}
            {displayClassroomOptions && <FacultyClassroom />}



          </div>
        </div>
      </div>


    </>
  )
}
