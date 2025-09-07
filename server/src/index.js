import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import classroomRoutes from "./routes/classroom.routes.js";
import postRoutes from "./routes/post.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import chatSocket from "./sockets/chat.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_ORIGIN, credentials: true },
});

//middleware
pp.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

//routes
app.use("/api/auth", authRoutes);
app.use("/api/classrooms", classroomRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/upload", uploadRoutes);

//socket
io.on("connection", (socket) => chatSocket(io, socket));

//connect to db and start server
// start
const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGODB_URI).then(() => {
  server.listen(PORT, () => console.log(`Server running on ${PORT}`));
});
