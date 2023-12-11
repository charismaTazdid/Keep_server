import express from "express"
import { getAllUser, getUserDetails, loginUser, registerUser, updateProfile } from "../controllers/authController.js"

const router = express.Router()


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getAllUser", getAllUser);

//PROFILE UPDATE ROUTE
router.post("/updateProfile", updateProfile);
// GET PROFILE DETAILS
router.get('/getUserDetails/:userId', getUserDetails)


export default router;