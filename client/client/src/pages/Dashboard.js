import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const [mine, setMine] = useState({ asTeacher: [], asMember: [] });
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    api.get("/classrooms/mine").then(({ data }) => setMine(data));
  }, []);
  const createClassroom = async () => {
    const { data } = await api.post("/classrooms", { name });
    setMine((m) => ({ ...m, asTeacher: [data.classroom, ...m.asTeacher] }));
    setName("");
  };
  const joinClassroom = async () => {
    const { data } = await api.post("/classrooms/join", { code });
    setMine((m) => ({ ...m, asMember: [data.classroom, ...m.asMember] }));
    setCode("");
  };
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Hi {user?.name}!</h1>

      {user?.role === "teacher" ? (
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Create Classroom</h2>
          <div className="flex gap-2">
            <input
              className="border p-2 flex-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Classroom name"
            />
            <button
              onClick={createClassroom}
              className="bg-black text-white px-4"
            >
              Create
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Join Classroom</h2>
          <div className="flex gap-2">
            <input
              className="border p-2 flex-1"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Join code"
            />
            <button
              onClick={joinClassroom}
              className="bg-black text-white px-4"
            >
              Join
            </button>
          </div>
        </div>
      )}

      <section>
        <h3 className="font-semibold mt-4">Your Classrooms</h3>
        <div className="grid md:grid-cols-2 gap-3">
          {[...mine.asTeacher, ...mine.asMember].map((c) => (
            <Link
              key={c._id}
              to={`/classrooms/${c._id}`}
              className="border p-3 rounded hover:bg-gray-50"
            >
              <div className="font-medium">{c.name}</div>
              <div className="text-xs text-gray-500">Code: {c.code}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
