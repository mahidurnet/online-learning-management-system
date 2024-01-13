import jwt from "jsonwebtoken";
import db from "../db/connection.mjs";
import mongodb from "mongodb";

export default async function protectUser(req, res, next) {
  try {
      let token;
      token = req.cookies.adminjwt;
      console.log("Admin token: ", token)
      if (!token) {
          throw new Error("Not authorized, token failed");
      }
      console.log("Admin token", token)
      // Verify the JWT token using the JWT_SECRET
      const decoded = jwt.verify(token, "secret");
      console.log("aDMIN TOKEN DECODED", decoded)
      // Find the user in the 'users' collection based on the decoded userId from the JWT
      const user = await db.collection("Users").findOne(
          { _id: new mongodb.ObjectId(decoded.userID) },
          { projection: { password: 0 } } 
      );

      if (!user) {
          throw new Error("Not authorized, token failed");
      }

      req.user = user;
      next();
  } catch (error) {
      console.log(error);
      res.status(401).json({ error: "Unauthorized" });
  }
}
