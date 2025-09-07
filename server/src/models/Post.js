import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    classroom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classroom",
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["announcement", "assignment"],
      default: "announcement",
    },
    title: { type: String, required: true },
    body: { type: String, required: true },
    attachments: [String],
    dueDate: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
