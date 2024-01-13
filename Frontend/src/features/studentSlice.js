import { createSlice } from "@reduxjs/toolkit";

// Load the faculty state from local storage if available
const initialState = {
  student: JSON.parse(localStorage.getItem("student")) || null,
};

export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    login: (state, action) => {
      state.student = action.payload;
      // Save the faculty state to local storage
      localStorage.setItem("student", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.student = null;
      // Remove the faculty state from local storage
      localStorage.removeItem("student");
    },
  },
});

export const { login, logout } = studentSlice.actions;

export const selectstudent = (state) => state.student.student;

export default studentSlice.reducer;