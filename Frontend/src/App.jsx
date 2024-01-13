/* eslint-disable no-unused-vars */
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from 'react-redux'
import { selectAdmin } from './features/adminSlice'

import './style.css'
import PrivateRoutes from "./PrivateRoutes";
import Dashboard from "./Dashboard/Dashboard";
import Signup from "./Signup/Signup";
import Signin from "./Signin/Signin";
import { ToastContainer } from 'react-toastify';
import FacultyDashBoard from './FacultyPanel/Dashboard';
import FacultyPrivateRoute from './FacultyRoutes';
import SigninFaculty from './Signin/SigninFaculty';
import StudentDashBoard from './StudentPanel/Dashboard';
import SigninStudent from "./Signin/SigninStudent";
import StudentPrivateRoute from "./StudentPrivateRoutes";
function App() {
  const isAdmin = useSelector((state) => state.admin.admin);
  const isFaculty = useSelector((state)=>state.faculty.faculty);
  const isStudent = useSelector((state)=>state.student.student);
  return (
    <>
      <Router>
        <Routes>

          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route element={<FacultyPrivateRoute />}>
            <Route path="/faculty/dashboard" element={<FacultyDashBoard  />} />
          </Route>
          <Route element={<StudentPrivateRoute />}>
            <Route path="/student/dashboard" element={<StudentDashBoard  />} />
          </Route>

          <Route path="/signup" element={<Signup />} />
       

          <Route
            path="/"
            element={
              isAdmin ? (
                <Navigate to="/dashboard" />
              ) : (
                <Signin />
              )
            }
          />


           <Route
            path="/faculty"
            element={
              isFaculty ? (
                <Navigate to="/faculty/dashboard" />
              ) : (
                <SigninFaculty />
              )
            }
          />
          <Route
            path="/student"
            element={
              isStudent ? (
                <Navigate to="/student/dashboard" />
              ) : (
                <SigninStudent />
              )
            }
          />

        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
