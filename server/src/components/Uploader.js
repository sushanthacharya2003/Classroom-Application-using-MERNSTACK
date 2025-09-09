import { useState } from "react";
import api from "../api/axios";

export default function Uploader({ onUploaded }) {
  const [file, setFile] = useState(null);

  const upload = async () => {
    const fd = new FormData();
    fd.append("file", file);
    const { data } = await api.post("/upload", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    onUploaded(data.url);
  };

  return (
    <div className="flex gap-2">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button
        className="bg-black text-white px-3"
        onClick={upload}
        disabled={!file}
      >
        Upload
      </button>
    </div>
  );
}
