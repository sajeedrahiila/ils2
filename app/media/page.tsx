import { useSession } from "next-auth/react";
import { useState } from "react";
import axios from "axios";

export default function MediaPage() {
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [type, setType] = useState("ebook");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) {
      setError("Title and file required");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("type", type);
    formData.append("file", file);
    try {
      await axios.post("/api/media/upload", formData);
      setSuccess("Upload successful. Awaiting approval.");
      setError("");
    } catch (err) {
      setError("Upload failed");
      setSuccess("");
    }
  };

  if (!session) {
    return <div className="p-8">Login to upload media.</div>;
  }

  return (
    <div className="min-h-screen p-8">
      <h2 className="text-2xl font-bold mb-4">Media Library</h2>
      <form onSubmit={handleUpload} className="flex flex-col gap-2 mb-4 max-w-md">
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="p-2 border rounded"
          placeholder="Title"
        />
        <select value={type} onChange={e => setType(e.target.value)} className="p-2 border rounded">
          <option value="ebook">Ebook</option>
          <option value="audio">Audio</option>
          <option value="lecture">Lecture</option>
        </select>
        <input
          type="file"
          onChange={e => setFile(e.target.files?.[0] || null)}
          className="p-2 border rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Upload</button>
      </form>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {success && <div className="text-green-500 mb-2">{success}</div>}
      <div className="mt-4">Uploaded media will appear here after approval.</div>
    </div>
  );
}
