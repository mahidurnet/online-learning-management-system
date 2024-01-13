import express from 'express';
import path from 'path'
import cors from 'cors';
import facultyRoute from './routes/facultyRoute.mjs';
import registerRoute from './routes/registerRoute.mjs';
import loginRoute from './routes/loginRoute.mjs';
import cookieParser from 'cookie-parser';
import courseRoute from './routes/courseRoute.mjs'
import studentRoute from './routes/studentRoute.mjs'
import facultyloginRoute from './routes/facultyloginRoute.mjs'
import studentloginRoute from './routes/studentloginRoute.mjs'
import classroomRoute from './routes/classroomRoute.mjs'
import facultyclassroomRoute from './routes/facultyclassroomRoute.mjs'
import studentclassroomRoute from './routes/studentclassroomRoute.mjs'
import joinclassroomRoute from './routes/joinclassroomRoute.mjs'
import logoutRoute from './routes/logoutRoute.mjs'
import facultyprofileRoute from './routes/facultyprofileRoute.mjs'
import studentprofileRoute from './routes/studentprofileRoute.mjs';
import dashboardoverviewRoute from './routes/dashboardoverviewRoute.mjs'
const app = express();
const PORT =  5000;

const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true,
  };
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/createcourse', courseRoute);
app.use('/createfaculty', facultyRoute);
app.use('/createstudent', studentRoute);
app.use('/login/faculty',facultyloginRoute);
app.use('/login/student', studentloginRoute);
app.use('/createclassroom',classroomRoute);
app.use('/createjoinclassroom',joinclassroomRoute);
app.use('/createfacultyclassroom',facultyclassroomRoute)
app.use('/createstudentclassroom',studentclassroomRoute)
app.use('/logout',logoutRoute);
app.use('/facultyprofile',facultyprofileRoute)
app.use('/studentprofile',studentprofileRoute)
app.use ('/createdashboardoverview', dashboardoverviewRoute)
app.use(express.static( path.resolve('photo')));

app.listen(PORT, ()=>{
    console.log("Server is running on: ",PORT);
})