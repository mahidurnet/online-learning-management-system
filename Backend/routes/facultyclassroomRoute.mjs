import express from 'express';
import db from '../db/connection.mjs';
import { ObjectId } from 'mongodb';
import protectFaculty from '../utils/protectFaculty.mjs';
import multer from 'multer';
import path from 'path';
import protectUser from '../utils/protectUser.mjs';

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

router.get('/:facultyclassroomId/getfiles', protectFaculty, async (req, res) => {
  const facultyclassroomId = req.params.facultyclassroomId;
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

router.post('/:facultyclassroomId/uploadfile', protectFaculty, upload.single('file'), async (req, res) => {
  console.log('Backend route accessed!');
  const { text } = req.body;
  const facultyclassroomId = req.params.facultyclassroomId;
  const facultyId = req.faculty._id.toString(); // Convert facultyId to string

  try {
    const facultyCollection = db.collection('faculty');
    const faculty = await facultyCollection.findOne({ _id: new ObjectId(facultyId) });

    if (!faculty) {
      res.status(404).json({ error: 'Faculty not found' });
      return;
    }

    const collection = db.collection('classroom');
    const facultyclassroom = await collection.findOne({
      _id: new ObjectId(facultyclassroomId),
    });

    if (!facultyclassroom) {
      res.status(404).json({ error: 'FacultyClassroom not found' });
      return;
    }

    const pendingFilesCollection = db.collection('pendingFiles'); // Add pendingFiles collection

    const result = await pendingFilesCollection.insertOne({
      filename: req.file.filename,
      participantId: new ObjectId(facultyId),
      classroomId: new ObjectId(facultyclassroomId), // Store related classroom ID
      facultyname: faculty.fname,
      text: text,
      facultyId: faculty.fId
    });

    if (result.insertedCount === 1) {
      res.json({ message: 'File added to pendingFiles collection successfully' });
    } else {
      res.status(404).json({ error: 'Failed to add file to pendingFiles collection' });
    }
  } catch (err) {
    console.error('Error saving file filename to the database:', err);
    res.status(500).json({ error: 'Failed to add file to pendingFiles collection' });
  }
});
router.get('/pendingFiles', async (req, res) => {
  try {
    console.log("Request");
    const pendingFilesCollection = db.collection('pendingFiles');
    
    // Use find to retrieve all documents from the pendingFiles collection
    const pendingFiles = await pendingFilesCollection.find({}).toArray();
    
    res.json(pendingFiles); 
  } catch (err) {
    console.error('Error retrieving pending files:', err);
    res.status(500).json({ error: 'Failed to fetch pending files' });
  }
});


//
// Add this route to your server code
router.delete('/:facultyclassroomId/deletefile/:filename', protectFaculty, async (req, res) => {
  const { facultyclassroomId, filename } = req.params;
  try {
      const result = await db.collection('classroom').updateOne(
          { _id: new ObjectId(facultyclassroomId) },
          { $pull: { pendingphoto: { filename } } }
      );

      if (result.modifiedCount === 1) {
          res.json({ message: 'File deleted successfully' });
      } else {
          res.status(404).json({ error: 'File not found or not deleted' });
      }
  } catch (error) {
      console.error('Error deleting file from the database:', error);
      res.status(500).json({ error: 'Failed to delete file from the facultyclassroom' });
  }
});

router.post('/:classroomid', protectUser, async (req, res)=>{
  try {
    const classroomCollection = db.collection('classroom'); // Replace with your collection name
    console.log(req.body);
    const { filename, participantId, fileid, text } = req.body;
    const classroomId = req.params.classroomid;
    const filter = { _id: new ObjectId(classroomId) };
    const updateDocument = {
      $push: {
        pendingphoto: {
          filename: filename,
          participantId: participantId,
          text: text,
        }
      }
    };

    const result = await classroomCollection.updateOne(filter, updateDocument);
    const pendingFilesCollection = db.collection('pendingFiles');
    await pendingFilesCollection.deleteOne({ _id: new ObjectId(fileid) });
    if (result) {
      res.json({ message: 'File added successfully' });
  } else {
      res.status(404).json({ error: 'File not added' });
  } 
  } catch (error) {
    console.error('Error adding file from the database:', error);
    res.status(500).json({ error: 'Failed to update file from the facultyclassroom' });
  }
})

//for rejecting
router.put('/:classroomid', protectUser, async (req, res)=>{
  try {
    console.log(req.body);
    const { fileid} =req.body;
    const pendingFilesCollection = db.collection('pendingFiles');
    await pendingFilesCollection.deleteOne({ _id: new ObjectId(fileid) });
    if (result) {
      res.json({ message: 'File added successfully' });
  } else {
      res.status(404).json({ error: 'File not added' });
  } 
  } catch (error) {
    console.error('Error adding file from the database:', error);
    res.status(500).json({ error: 'Failed to update file from the facultyclassroom' });
  }
})
export default router;
