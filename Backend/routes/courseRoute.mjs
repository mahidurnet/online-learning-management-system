import express from "express";
import db from "../db/connection.mjs";
import {ObjectId} from "mongodb";
import protectUser from '../utils/protectUser.mjs'

const router = express.Router();
const collectionName = 'course'; // Define your collection name

// Create a unique index on the 'time' field
db.collection(collectionName).createIndex({ faculty: 1, time: 1 }, { unique: true });

router.post("/", protectUser, async (req, res) => {
  let { cId, faculty, section, time } = req.body;

  // Ensure that cId, faculty, section, and time are strings
  cId = String(cId);
  faculty = String(faculty);
  section = String(section);
  time = String(time);

  try {
    const newCourse = {
      cId,
      faculty,
      section,
      time,
    };

    let collection = await db.collection("course");
    let result = await collection.insertOne(newCourse, (err, result) => {
      if (err) {
        console.error("Error creating course:", err);
        res.status(500).json({ error: "Failed to create course" });
      } else {
        res.json({ message: "Course registered successfully" });
      }
    });
    
    if (!result.insertedId) {
      res.status(400);
      throw new Error('Failed to create course');
    }

  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ error: 'Failed to create course' });
  }
});

router.get("/allcourses", async (req, res) => {
  try {
    let collection = await db.collection("course");
    let courses = await collection.find({}).toArray();
    res.json(courses);
  } catch (error) {
    console.error('Error retrieving courses:', error);
    res.status(500).json({ error: 'Failed to retrieve courses' });
  }
});

router.post('/updatecourse/:courseId',protectUser, async (req, res) => { // Use the HTTP PUT method for updating resources
  const cid = req.params.courseId;
  const { cId, faculty, section, time } = req.body;
  // Assuming db is properly set up and connected to your MongoDB database
  const collection = db.collection('course');
  
  try {
    // Make sure to pass an object with the new data to be updated
    const newCourse = {
      cId, faculty, section, time
  };
    const updatedCourse = await collection.updateOne({ _id: new ObjectId(cid) }, { $set: newCourse });
    
    if (updatedCourse.modifiedCount > 0) { // Check if any documents were modified
      res.json({ message: 'Successful' });
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update course' });
  }
});
router.delete('/courses/:courseId', async (req, res) => {
  try {
    const courseId = req.params.courseId;
    
    const collection = db.collection('course'); // Use the correct collection name

    const result = await collection.deleteOne({ _id: new ObjectId(courseId) });

    if (result.deletedCount === 1) {
      res.json({ message: 'Course deleted successfully' });
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ message: 'Failed to delete course' });
  }
});

export default router;