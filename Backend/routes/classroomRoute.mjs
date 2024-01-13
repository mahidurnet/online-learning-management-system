import express from "express";
import db from "../db/connection.mjs";
import {ObjectId} from "mongodb";
import protectFaculty from '../utils/protectFaculty.mjs'

const router = express.Router();
//POST-> contest/register
//This router will be activated when someone registers a new accou
  router.post("/", protectFaculty, async (req, res) => {
    const facultyObj = req.faculty ;
    const {  cId, section, faculty, code } = req.body;
    try {
      const newClassroom = {
        
        cId,
        faculty,
        facultyObj,
        section,
        code,
      };
  
      let collection = await db.collection("classroom");
      const result = await collection.insertOne(newClassroom);
  
      if (result.insertedId) {
        res.json({ message: "Classroom created successfully" });
      } else {
        res.status(500).json({ error: "Failed to create classroom" });
      }
    } catch (error) {
      console.error("Error creating classroom:", error);
      res.status(500).json({ error: "Failed to create classroom" });
    }
  });
  router.get("/",protectFaculty, async (req, res) => {
    try {
      const facultyId = req.faculty._id; // Assuming you have the faculty ID in the faculty object
      let collection = await db.collection("classroom");
      
      let classrooms = await collection.find({
        "facultyObj._id": facultyId
      }).toArray();
  
      res.json(classrooms);
    } catch (error) {
      console.error('Error retrieving faculty:', error);
      res.status(500).json({ error: 'Failed to retrieve faculty' });
    }
  });
  
  router.delete('/classroom/:classroomId', async (req, res) => {
    try {
      const classroomId = req.params.classroomId;
      
      const collection = db.collection('classroom'); // Use the correct collection name
  
      const result = await collection.deleteOne({ _id: new ObjectId(classroomId) });
  
      if (result.deletedCount === 1) {
        res.json({ message: 'Classroom deleted successfully' });
      } else {
        res.status(404).json({ message: 'Classroom not found' });
      }
    } catch (error) {
      console.error('Error deleting classroom:', error);
      res.status(500).json({ message: 'Failed to delete classroom' });
    }
  });

export default router;