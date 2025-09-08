import Message from "../models/Message.js";

export default function chatSocket(io, socket) {
  // client will emit "join" with classroomId
  socket.on("join", (classroomId) => {
    socket.join(classroomId);
  });
  // One student sends → server receives + saves → server broadcasts → all classmates get the new message.
  // client emits "message:new" with { classroomId, userId, text }
  socket.on("message:new", async (payload) => {
    const msg = await Message.create({
      classroom: payload.classroomId,
      sender: payload.userId,
      text: payload.text,
    });
    io.to(payload.classroomId).emit("message:incoming", {
      _id: msg._id,
      classroom: payload.classroomId,
      sender: payload.userId,
      text: payload.text,
      createdAt: msg.createdAt,
    });
  });
}
