import { createSlice } from "@reduxjs/toolkit";

// Load the admin state from local storage if available
const initialState = {
  admin: JSON.parse(localStorage.getItem("admin")) || null,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    login: (state, action) => {
      state.admin = action.payload;
      // Save the admin state to local storage
      localStorage.setItem("admin", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.admin = null;
      // Remove the admin state from local storage
      localStorage.removeItem("admin");
    },
  },
});

export const { login, logout } = adminSlice.actions;

export const selectAdmin = (state) => state.admin.admin;

export default adminSlice.reducer;