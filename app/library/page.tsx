import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function LibraryPage() {
  const { data: session } = useSession();
  const [entries, setEntries] = useState<any[]>([]);
  const [error, setError] = useState("");

  const fetchEntries = async () => {
    try {
      const res = await axios.get("/api/library");
      setEntries(res.data.entries);
    } catch (err) {
      setError("Failed to fetch library entries");
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  if (!session) {
    return <div className="p-8">Login to view library.</div>;
  }

  return (
    <div className="min-h-screen p-8">
      <h2 className="text-2xl font-bold mb-4">Qur’an, Tafsīr, Hadith Library</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {entries.map((entry, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 rounded shadow p-4">
            <h3 className="font-bold text-lg mb-2">{entry.title}</h3>
            <p>Type: {entry.type}</p>
            <p>Author: {entry.author}</p>
            <p>Language: {entry.language}</p>
            <a href={entry.fileUrl} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View</a>
          </div>
        ))}
      </div>
    </div>
  );
}
