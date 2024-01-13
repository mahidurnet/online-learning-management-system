import express from 'express';
import db from '../db/connection.mjs';
import { ObjectId } from 'mongodb';
import protectStudent from '../utils/protectStudent.mjs';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'photo');
  },
  filename: function (req, file, cb) {
    const uniqueFilename = `${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueFilename);
  },
});
const upload = multer({ storage });

router.get('/:facultyclassroomId', protectStudent, async (req, res) => {
  const facultyclassroomId = req.params.facultyclassroomId;
  const studentId = req.student._id;
  try {
    const collection = db.collection('classroom');
    const facultyclassroom = await collection.findOne({
      _id: new ObjectId(facultyclassroomId),

    });

    if (!facultyclassroom) {
      res.status(404).json({ error: 'FacultyClassroom not found' });
      return;
    }

    res.json(facultyclassroom);
  } catch (err) {
    console.error('Error fetching classroom data:', err);
    res.status(500).json({ error: 'Failed to fetch classroom data' });
  }
});

 



export default router;
