import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const newUser = { ...form };
    if (form.username === "" || form.email === "" || form.password === "") return;
    await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
      credentials: "include",
    }).catch((error) => {
      window.alert(error);
      return;
    });
    setForm({ username: "", email: "", password: "" });
    navigate("/");
    toast.success("Signup Successfull!"); 
  }
  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <h2>Sign Up</h2>
        <div className="form-group">
          <label htmlFor="newUsername">Username:</label>
          <input
            type="text"
            id="newUsername"
            name="newUsername"
            placeholder="Name"
            onChange={(e) => {
              updateForm({ username: e.target.value });
            }}
          />
        </div>
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
            type={showPassword ? 'text' : 'password'}
            id="newPassword"
            name="newPassword"
            placeholder="Password"
            value={form.password}
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
          <button className="sign-up" type="submit">
            Sign Up
          </button>
        </div>
      </form>
      <p>
        Already have an account? <Link to="/" className="last_btn">Sign In</Link>
      </p>
    </div>
  );
};

export default Signup;
