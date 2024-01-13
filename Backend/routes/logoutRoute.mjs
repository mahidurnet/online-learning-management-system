
import express from "express";

const router = express.Router();
//POST-> contest/login
//This router will be activated when someone logs into a  account
router.get('/admin', async (req, res, next) => {
  try {
    res.clearCookie("adminjwt",{sameSite:"none", secure: true});
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Failed to log out", error);
  }
});
router.get('/student', async (req, res, next) => {
  try {
    res.clearCookie("studentjwt",{sameSite:"none", secure: true});
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Failed to log out", error);
  }
});
router.get('/faculty', async (req, res, next) => {
  try {
    res.clearCookie("facultyjwt",{sameSite:"none", secure: true});
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Failed to log out", error);
  }
});
export default router;