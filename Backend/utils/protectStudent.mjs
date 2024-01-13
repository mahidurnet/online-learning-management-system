import jwt from "jsonwebtoken";
import db from "../db/connection.mjs";
import mongodb from "mongodb";

export default async function protectStudent(req, res, next) {
  try {
      let token;
      token = req.cookies.studentjwt;
      console.log(token)
      if (!token) {
          throw new Error("Not authorized, token failed");
      }

      // Verify the JWT token using the JWT_SECRET
      const decoded = jwt.verify(token, "secret");
      console.log(decoded)  ;
      // Find the user in the 'users' collection based on the decoded userId from the JWT
      const student= await db.collection("student").findOne(
          { _id: new mongodb.ObjectId(decoded.studentID) },
          { projection: { password: 0 } } // Excluding the 'password' field from the result
      );

      if (!student) {
          throw new Error("Not authorized, token failed");
      }

      req.student = student;
      next();
  } catch (error) {
      console.log(error);
      res.status(401).json({ error: "Unauthorized" });
  }
}
