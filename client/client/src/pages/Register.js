import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const submit = async (e) => {
    e.preventDefault();
    await register(form);
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={submit} className="w-80 space-y-3">
        <h1 className="text-2xl font-bold">Register</h1>
        {["name", "email", "password"].map((k) => (
          <input
            key={k}
            className="border p-2 w-full"
            type={k === "password" ? "password" : "text"}
            value={form[k]}
            onChange={(e) => setForm({ ...form, [k]: e.target.value })}
            placeholder={k}
          />
        ))}
        <select
          className="border p-2 w-full"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
        <button className="w-full bg-black text-white p-2">
          Create account
        </button>
      </form>
    </div>
  );
}
