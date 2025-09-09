import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

let socket;

export default function Classroom() {
  const { id } = useParams();
  const { user } = useAuth();
  const [classroom, setClassroom] = useState(null);
  const [posts, setPosts] = useState([]);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const endRef = useRef(null);

  useEffect(() => {
    api
      .get(`/classrooms/${id}`)
      .then(({ data }) => setClassroom(data.classroom));
    api.get(`/posts/${id}`).then(({ data }) => setPosts(data.posts));

    socket = io("http://localhost:5000");
    socket.emit("join", id);
    socket.on("message:incoming", (m) => setMessages((prev) => [...prev, m]));
    return () => {
      socket.disconnect();
    };
  }, [id]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!msg.trim()) return;
    socket.emit("message:new", { classroomId: id, userId: user.id, text: msg });
    setMsg("");
  };

  return (
    <div className="max-w-4xl mx-auto p-4 grid md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">{classroom?.name}</h2>
        <h3 className="font-medium mb-3">Posts</h3>
        <div className="space-y-3">
          {posts.map((p) => (
            <div key={p._id} className="border p-3 rounded">
              <div className="text-sm text-gray-500">
                {p.type} • {new Date(p.createdAt).toLocaleString()}
              </div>
              <div className="font-semibold">{p.title}</div>
              <p className="text-sm">{p.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col h-[70vh] border rounded">
        <div className="p-3 border-b font-semibold">Classroom Chat</div>
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {messages.map((m) => (
            <div key={m._id} className="p-2 bg-gray-50 rounded">
              {m.text}
            </div>
          ))}
          <div ref={endRef} />
        </div>
        <div className="p-3 border-t flex gap-2">
          <input
            className="border p-2 flex-1"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Say something..."
          />
          <button onClick={sendMessage} className="bg-black text-white px-4">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
