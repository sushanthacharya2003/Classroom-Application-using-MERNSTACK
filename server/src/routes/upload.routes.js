import { Router } from "express";
import multer from "multer";
import { auth } from "../middleware/auth.js";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.post("/", auth, upload.single("file"), (req, res) => {
  // return public URL for client to store on a post
  const url = `/uploads/${req.file.filename}`;
  res.status(201).json({ url, original: req.file.originalname });
});

export default router;
