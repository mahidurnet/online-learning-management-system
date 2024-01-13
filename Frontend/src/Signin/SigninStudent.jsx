import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { login} from '../features/studentSlice';
import { useDispatch } from 'react-redux';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SigninStudent = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
 
  const [showPassword, setShowPassword] = useState(false); // State to control password visibility
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const authData = { ...form };
    if (form.email === '' || form.password === '') return;
    const response = await fetch('http://localhost:5000/login/student', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authData),
      credentials: 'include',
    });
    if (!response.ok) {
      // Handle authentication failure
      toast.warn("someting went wrong!!!")
    } else {
      toast.success("Signin Successfull!"); 
      dispatch(login({ isStudent: true }));
      navigate('/dashboard');
    }

    setForm({ email: '', password: '' });
  }

  return (
    <>
    <div className="container">
      <form onSubmit={onSubmit}>
        <h2>Sign In</h2>
        <div className="form-group">
          <label htmlFor="newEmail">Email:</label>
          <input
            type="email"
            id="newEmail"
            name="newEmail"
            placeholder="Email"
            onChange={(e) => {
              updateForm({ email: e.target.value });
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">Password:</label>
          <input
            className="log-in-password"
            type={showPassword ? 'text' : 'password'} // Toggle between text and password type
            id="newPassword"
            name="newPassword"
            placeholder="Password"
            value={form.password} // Use form.password as the input value
            onChange={(e) => {
              updateForm({ password: e.target.value });
            }}
          />
          <div className='show_pass'>
          <label>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)} // Toggle password visibility
            />{' '}
            Show Password
          </label>
          </div>
        </div>
        <div className="btn-div">
          <button className="sign-in" type="submit">
            Sign In
          </button>
        </div>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
    
   </>
  );
};

export default SigninStudent;
