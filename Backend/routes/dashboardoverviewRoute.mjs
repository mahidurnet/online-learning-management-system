import express from "express";
import db from "../db/connection.mjs";
import protectUser from '../utils/protectUser.mjs';

const router = express.Router();

router.get('/student/count', protectUser, async (req, res) => {
  try {
    const collection = db.collection('student'); // Use the correct collection name

    const count = await collection.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error('Error fetching student count:', err);
    res.status(500).json({ error: 'Failed to fetch student count' });
  }
});
router.get('/faculty/count', protectUser, async (req, res) => {
    try {
      const collection = db.collection('faculty'); // Use the correct collection name
  
      const count = await collection.countDocuments();
      res.json({ count });
    } catch (err) {
      console.error('Error fetching student count:', err);
      res.status(500).json({ error: 'Failed to fetch student count' });
    }
  });
  router.get('/course/count', protectUser, async (req, res) => {
    try {
      const collection = db.collection('course'); // Use the correct collection name
  
      const count = await collection.countDocuments();
      res.json({ count });
    } catch (err) {
      console.error('Error fetching student count:', err);
      res.status(500).json({ error: 'Failed to fetch student count' });
    }
  });

export default router;
