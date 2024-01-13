import express from "express";
import db from "../db/connection.mjs";
import { ObjectId } from "mongodb";
import protectStudent from '../utils/protectStudent.mjs';

const router = express.Router();

// Define a route to show a faculty profile by ID
router.get('/', protectStudent, async (req, res) => {
  try {
    const studentId = req.student; // Get facultyId from the URL
    console.log("student",studentId);
    const collection = db.collection('student'); // Use the correct collection name

    // Find the faculty with the specified facultyId
    const student = await collection.findOne({ _id: new ObjectId(studentId._id) });

    if (student) {
      // Faculty found, so you can send the faculty information in the response
      res.json(student);
    } else {
      // Faculty not found
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    console.error('Error retrieving student:', error);
    res.status(500).json({ error: 'Failed to retrieve student' });
  }
});


export default router;
