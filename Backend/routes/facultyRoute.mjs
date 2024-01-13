import express from "express";
import db from "../db/connection.mjs";
import { ObjectId } from "mongodb";
import protectUser from '../utils/protectUser.mjs'
import bcrypt from "bcrypt";
import multer from "multer";
const router = express.Router();
const collectionName = 'faculty'; // Define your collection name



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'photo');
  },
  filename: function (req, file, cb) {

    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}-${file.originalname}`;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage });


router.post('/upload-photo/:facultyId', upload.single('facultyPhoto'), async (req, res) => {
  const facultyId = req.params.facultyId;
  const photoFileName = req.file.filename;

  try {

    let collection = await db.collection("faculty");
    const faculty = await collection.findOne(new ObjectId(facultyId));
    if (!faculty) {
      return res.status(404).json({ message: 'Faculty not found' });
    }

    faculty.photo = photoFileName;


    await collection.updateOne({ _id: new ObjectId(facultyId) }, { $set: { photo: photoFileName } });

    res.status(200).json({ message: 'Photo uploaded and linked to the faculty member' });
  } catch (err) {
    console.error('Error uploading photo:', err);
    res.status(500).json({ message: 'Failed to upload photo' });
  }
});


db.collection(collectionName).createIndex({ fId: 1, phone:1 }, { unique: true });
router.post("/", protectUser, async (req, res) => {
  const { fId, fname, email, phone, password } = req.body;
  console.log(req.body);
  const phoneRegex = /^\+8801[0-9]{9}$/; // Regex pattern for Bangladeshi mobile numbers
  const isValidPhone = phoneRegex.test(phone);

  if (!isValidPhone) {
    return res.status(400).json({ error: 'Phone number should be 11 digits starting with +880' });
  }


  try {
    const saltrounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltrounds);
    console.log("Hashed Password:", hashedPassword);
    const formattedEmail = email.endsWith('@gmail.com') ? email : `${email}@gmail.com`;

    let newFaculty = {
      fId, fname, email: formattedEmail, phone, hashedPassword
    };

    let collection = await db.collection("faculty");
    let result = await collection.insertOne(newFaculty);

    if (result.insertedId) {
      res.json({ message: "faculty added successfully" });
    } else {
      res.status(400);
      throw new Error('Failed to create user');
    }
  } catch (error) {
    console.error('Error hashing password:', error);
    res.status(500).json({ error: 'Failed to add faculty' });
  }
});


router.get("/allfaculty", async (req, res) => {
  try {
    let collection = await db.collection("faculty");
    let faculty = await collection.find({}).toArray();
    res.json(faculty);
  } catch (error) {
    console.error('Error retrieving faculty:', error);
    res.status(500).json({ error: 'Failed to retrieve faculty' });
  }
});

router.post('/updatefaculty/:facultyId', protectUser, async (req, res) => { // Use the HTTP PUT method for updating resources
  const fid = req.params.facultyId;
  const { fId, fname, email, phone } = req.body;
  // Assuming db is properly set up and connected to your MongoDB database
  const collection = db.collection('faculty');

  try {
    // Make sure to pass an object with the new data to be updated
    const newFaculty = {
      fId, fname, email, phone
    };
    const updatedFaculty = await collection.updateOne({ _id: new ObjectId(fid) }, { $set: newFaculty });

    if (updatedFaculty.modifiedCount > 0) { // Check if any documents were modified
      res.json({ message: 'Successful' });
    } else {
      res.status(404).json({ error: 'Faculty not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update faculty' });
  }
});
router.delete('/faculty/:facultyId', async (req, res) => {
  try {
    const facultyId = req.params.facultyId;

    const collection = db.collection('faculty'); // Use the correct collection name

    const result = await collection.deleteOne({ _id: new ObjectId(facultyId) });

    if (result.deletedCount === 1) {
      res.json({ message: 'Faculty deleted successfully' });
    } else {
      res.status(404).json({ message: 'Faculty not found' });
    }
  } catch (error) {
    console.error('Error deleting faculty:', error);
    res.status(500).json({ message: 'Failed to delete faculty' });
  }
});

export default router;