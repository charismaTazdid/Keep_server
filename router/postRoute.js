import express from "express";
import multer from "multer";
import { createPost, getMyImage } from "../controllers/postController.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/uploadImage", upload.single('prescription'), createPost);

router.get("/getMyImages/:userId", getMyImage);

export default router;