import { Router } from "express";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import Classroom from "../models/Classroom.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.get("/:classroomId", auth, async (req, res) => {
  const posts = await Post.find({ classroom: req.params.classroomId })
    .sort({ createdAt: -1 })
    .populate("author", "name role");
  res.json({ posts });
});

router.post("/:classroomId", auth, async (req, res) => {
  const { title, body, type, dueDate, attachments } = req.body;
  // sanity: ensure user is teacher or member of class
  const cls = await Classroom.findById(req.params.classroomId);
  if (!cls) return res.status(404).json({ message: "Classroom not found" });
  const isMember =
    cls.teacher.toString() === req.user.id || cls.members.includes(req.user.id);
  if (!isMember) return res.status(403).json({ message: "Forbidden" });

  const post = await Post.create({
    classroom: req.params.classroomId,
    author: req.user.id,
    title,
    body,
    type: type || "announcement",
    dueDate,
    attachments: attachments || [],
  });
  res.status(201).json({ post });
});

router.post("/:postId/comments", auth, async (req, res) => {
  const { text } = req.body;
  const comment = await Comment.create({
    post: req.params.postId,
    author: req.user.id,
    text,
  });
  res.status(201).json({ comment });
});
export default router;
