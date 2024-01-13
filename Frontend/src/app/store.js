import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../features/adminSlice";
import facultyReducer from "../features/facultySlice";
import studentReducer from "../features/studentSlice";
export default configureStore(
    {
        reducer:{
            admin: adminReducer,
            faculty: facultyReducer,
            student: studentReducer,
        }
    }
)