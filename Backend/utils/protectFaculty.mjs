import jwt from "jsonwebtoken";
import db from "../db/connection.mjs";
import mongodb from "mongodb";

export default async function protectFaculty(req, res, next) {
  try {
      let token;
      token = req.cookies.facultyjwt;
      console.log(token)
      if (!token) {
          throw new Error("Not authorized, token failed");
      }

      // Verify the JWT token using the JWT_SECRET
      const decoded = jwt.verify(token, "secret");
      console.log(decoded)  ;
      // Find the user in the 'users' collection based on the decoded userId from the JWT
      const faculty= await db.collection("faculty").findOne(
          { _id: new mongodb.ObjectId(decoded.facultyID) },
          { projection: { password: 0 } } // Excluding the 'password' field from the result
      );

      if (!faculty) {
          throw new Error("Not authorized, token failed");
      }

      req.faculty = faculty;
      console.log(faculty)
      next();
  } catch (error) {
      console.log(error);
      res.status(401).json({ error: "Unauthorized" });
  }
}
