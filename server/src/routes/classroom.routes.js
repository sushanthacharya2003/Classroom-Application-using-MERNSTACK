import { Router } from "express";
import Classroom from "../models/Classroom.js";
import { auth } from "../middleware/auth.js";
import { requireRole } from "../middleware/role.js";

const router = Router();

router.post("/", auth, requireRole("teacher"), async (req, res) => {
  const { name } = req.body;
  const code = (await import("../utils/generateCode.js")).default();
  const classroom = await Classroom.create({
    name,
    code,
    teacher: req.user.id,
  });
  res.status(201).json({ classroom });
});
router.post("/join", auth, async (req, res) => {
  const { code } = req.body;
  const classroom = await Classroom.findOne({ code });
  if (!classroom)
    return res.status(404).json({ message: "Classroom not found" });
  if (
    !classroom.members.includes(req.user.id) &&
    classroom.teacher.toString() !== req.user.id
  ) {
    classroom.members.push(req.user.id);
    await classroom.save();
  }
  res.json({ classroom });
});
router.get("/mine", auth, async (req, res) => {
  const asTeacher = await Classroom.find({ teacher: req.user.id });
  const asMember = await Classroom.find({ members: req.user.id });
  res.json({ asTeacher, asMember });
});

router.get("/:id", auth, async (req, res) => {
  const room = await Classroom.findById(req.params.id).populate(
    "teacher",
    "name"
  );
  if (!room) return res.status(404).json({ message: "Not found" });
  res.json({ classroom: room });
});

export default router;
