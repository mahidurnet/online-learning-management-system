import express from "express";
import db from "../db/connection.mjs";
import { ObjectId } from "mongodb";
import protectUser from '../utils/protectUser.mjs'
import bcrypt from "bcrypt";
import multer from "multer";

const router = express.Router();
const CollectionName = 'student'; // Define your student collection name

// Multer storage configuration for student photos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'photo'); // Destination folder to store student photos
  },
  filename: function (req, file, cb) {
    // Generating a unique filename for the uploaded photo (can be customized)
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}-${file.originalname}`;
    cb(null, uniqueSuffix);
  },
});

// Multer upload configuration for student photos
const upload = multer({ storage: storage });

// Express route to handle photo upload for a specific student
router.post('/upload-photo/:studentId', upload.single('studentPhoto'), async (req, res) => {
  const studentId = req.params.studentId;
  const photoFileName = req.file.filename; // Filename of the uploaded photo

  try {
    // Find the student by ID
    let collection = await db.collection("student");
    const student = await collection.findOne(new ObjectId(studentId));
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    // Update the student's photo field with the uploaded photo's filename
    student.photo = photoFileName;

    // Save the changes to the student document
    await collection.updateOne({ _id: new ObjectId(studentId) }, { $set: { photo: photoFileName } });

    res.status(200).json({ message: 'Photo uploaded and linked to the student' });
  } catch (err) {
    console.error('Error uploading photo:', err);
    res.status(500).json({ message: 'Failed to upload photo' });
  }
});

// Create a unique index on the 'sId' field for students
db.collection(CollectionName).createIndex({ sId: 1 }, { unique: true });
router.post("/", protectUser, async (req, res) => {
  const { sId, stdname, email, mobile, password } = req.body;

  // Validate mobile number format (11 digits starting with +880 for Bangladesh)
  const mobileRegex = /^\+8801[0-9]{9}$/; // Regex pattern for Bangladeshi mobile numbers
  const isValidMobile = mobileRegex.test(mobile);

  if (!isValidMobile) {
    return res.status(400).json({ error: 'Mobile number should be 11 digits starting with +880' });
  }

  try {
    const saltrounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltrounds);
    console.log("Hashed Password:", hashedPassword);
    const formattedEmail = email.endsWith('@gmail.com') ? email : `${email}@gmail.com`;

    let newStudent = {
      sId,
      stdname,
      email: formattedEmail,
      mobile,
      hashedPassword,
    };

    let collection = await db.collection("student");
    let result = await collection.insertOne(newStudent);

    if (result.insertedId) {
      res.json({ message: "Student added successfully" });
    } else {
      res.status(400);
      throw new Error('Failed to create student');
    }
  } catch (error) {
    console.error('Error hashing password:', error);
    res.status(500).json({ error: 'Failed to add student' });
  }
});

router.get("/allstudent", async (req, res) => {
  try {
    let collection = await db.collection("student");
    let student = await collection.find({}).toArray();
    res.json(student);
  } catch (error) {
    console.error('Error retrieving student:', error);
    res.status(500).json({ error: 'Failed to retrieve student' });
  }
});

router.post('/updatestudent/:studentId',protectUser, async (req, res) => { // Use the HTTP PUT method for updating resources
  const sid = req.params.studentId;
  const { sId, stdname, email, mobile } = req.body;
  // Assuming db is properly set up and connected to your MongoDB database
  const collection = db.collection('student');
  
  try {
    // Make sure to pass an object with the new data to be updated
    const newStudent = {
      sId, stdname, email, mobile
  };
    const updatedStudent = await collection.updateOne({ _id: new ObjectId(sid) }, { $set: newStudent });
    
    if (updatedStudent.modifiedCount > 0) { // Check if any documents were modified
      res.json({ message: 'Successful' });
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update student' });
  }
});
router.delete('/student/:studentId', async (req, res) => {
  try {
    const studentId = req.params.studentId;
    
    const collection = db.collection('student'); // Use the correct collection name

    const result = await collection.deleteOne({ _id: new ObjectId(studentId) });

    if (result.deletedCount === 1) {
      res.json({ message: 'Student deleted successfully' });
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ message: 'Failed to delete student' });
  }
});

export default router;