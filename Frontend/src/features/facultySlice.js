import { createSlice } from "@reduxjs/toolkit";

// Load the faculty state from local storage if available
const initialState = {
  faculty: JSON.parse(localStorage.getItem("faculty")) || null,
};

export const facultySlice = createSlice({
  name: "faculty",
  initialState,
  reducers: {
    login: (state, action) => {
      state.faculty = action.payload;
      // Save the faculty state to local storage
      localStorage.setItem("faculty", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.faculty = null;
      // Remove the faculty state from local storage
      localStorage.removeItem("faculty");
    },
  },
});

export const { login, logout } = facultySlice.actions;

export const selectfaculty = (state) => state.faculty.faculty;

export default facultySlice.reducer;