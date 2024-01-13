import express from "express";
import db from "../db/connection.mjs";
import { ObjectId } from "mongodb";
import protectFaculty from '../utils/protectFaculty.mjs';

const router = express.Router();

// Define a route to show a faculty profile by ID
router.get('/', protectFaculty, async (req, res) => {
  try {
    const facultyId = req.faculty; // Get facultyId from the URL
    console.log("Faculty",facultyId);
    const collection = db.collection('faculty'); // Use the correct collection name

    // Find the faculty with the specified facultyId
    const faculty = await collection.findOne({ _id: new ObjectId(facultyId._id) });

    if (faculty) {
      // Faculty found, so you can send the faculty information in the response
      res.json(faculty);
    } else {
      // Faculty not found
      res.status(404).json({ message: 'Faculty not found' });
    }
  } catch (error) {
    console.error('Error retrieving faculty:', error);
    res.status(500).json({ error: 'Failed to retrieve faculty' });
  }
});


export default router;
