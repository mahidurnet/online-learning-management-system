import express from "express";
import db from "../db/connection.mjs";
import mongodb, { ObjectId } from "mongodb";
import protectStudent from "../utils/protectStudent.mjs";
import protectUser from "../utils/protectUser.mjs";

const router = express.Router();

// POST -> classroom/join
// This router allows a student to join a classroom
// router.post('/join', protectStudent, async (req, res, next) => {
//     try {
//         const { code} = req.body;
//         const studentId = req.student._id; // Assuming you have the student ID in the user object
//         console.log("Classroom code ",req.body)
//         const student = await db.collection("student").findOne(
//             {
//                 _id : new ObjectId(studentId)
//             }
//         );

//         // Add the student to the classroom
//         // const result = await db.collection("classroom").updateOne(
//         //     { code: code },
//         //     { $push: { students: student} }
//         // );

//         if (result.modifiedCount === 1) {
//             res.status(200).json({ message: "Student joined the classroom successfully" });
//         } else {
//             res.status(500).json({ message: "Failed to join the classroom" });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// });
router.get('/', protectStudent, async (req, res) => {
    const studentId = req.student._id;
    try {
      const collection = db.collection('classroom');
      const classrooms = await collection.aggregate([
        {
          $match: {
            'students._id': new ObjectId(studentId)
          }
        }
      ]).toArray();
  
      res.json(classrooms);
    } catch (err) {
      console.error('Error fetching classrooms:', err);
      res.status(500).json({ error: 'Failed to fetch classrooms' });
    }
  });
  
router.post('/join', protectStudent, async (req, res, next) => {
  try {
      const { code } = req.body;
      const studentId = req.student._id;
      
      // Find the student information
      const student = await db.collection("student").findOne({ _id: new ObjectId(studentId) });

      // Find the classroom using the provided code
      const classroom = await db.collection("classroom").findOne({ code: code });
      const course = await db.collection('course').findOne({cId: classroom.cId});
      if (!classroom) {
          return res.status(404).json({ message: "Classroom not found" });
      }

      // Create an object containing classroom and student information for pending request
      const pendingRequest = {
        classroom,course, student
      };

      // Insert the pending request into the 'pendingreq' collection
      const insertedRequest = await db.collection("pendingreq").insertOne(pendingRequest);

      if (insertedRequest.insertedCount === 1) {
          res.status(200).json({ message: "Student request added successfully" });
      } else {
          res.status(500).json({ message: "Failed to add student request" });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
  }
});


// Replace the existing route
router.get('/pending-requests', protectUser, async (req, res) => {
  try {
      // Find all pending requests for the student from the 'pendingreq' collection
      const pendingRequests = await db.collection("pendingreq").find().toArray();

      res.json(pendingRequests);
  } catch (error) {
      console.error('Error retrieving pending requests:', error);
      res.status(500).json({ error: 'Failed to retrieve pending requests' });
  }
});

// Express route for accepting a student request
router.post('/:classroomId/:studentId', protectUser, async (req, res) => {
    try {
        const { classroomId, studentId } = req.params;
        console.log('Classroom:', classroomId);
        console.log('Student:', studentId)
        const student = await db.collection("student").findOne({
            _id: new ObjectId(studentId)
        });

        const result = await db.collection("classroom").updateOne(
            { _id: new ObjectId(classroomId) },
            { $push: { students: student } }
        )
        if (result.modifiedCount === 1) {
             await db.collection("pendingreq").deleteOne(
            {
              'student._id':new ObjectId(student._id),
              'classroom._id': new ObjectId(classroomId)
            }
          )
            res.status(200).json({ message: "Student joined the classroom successfully" });
        } else {
            res.status(500).json({ message: "Failed to join the classroom" });
        }
    } catch (error) {
        console.error('Error accepting student request:', error);
        res.status(500).json({ error: 'Failed to accept student request' });
    }
});
router.delete('/:classroomId/:studentId', async (req, res) => {
    try {
      const { classroomId, studentId } = req.params;
      const status = await db.collection("pendingreq").deleteOne(
        {
          'student._id':new ObjectId( studentId),
          'classroom._id': new ObjectId(classroomId)
        }
      )
      if (status ) {
        res.status(200).json({ message: 'Student removed from the classroom successfully' });
      } else {
        res.status(500).json({ message: 'Failed to remove student from the classroom' });
      }
    } catch (error) {
      console.error('Error removing student from the classroom:', error);
      res.status(500).json({ error: 'Failed to remove student from the classroom' });
    }
  });
  
  

  
export default router;
