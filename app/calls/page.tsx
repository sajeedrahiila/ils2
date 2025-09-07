import { useSession } from "next-auth/react";
import { useState } from "react";
// import { LiveKitRoom, useRoom } from "@livekit/components-react"; // Uncomment when LiveKit is installed

export default function CallsPage() {
  const { data: session } = useSession();
  const [roomUrl, setRoomUrl] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  // Placeholder for LiveKit integration
  // const { connect, disconnect } = useRoom();

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Fetch token from backend
    if (!roomUrl || !token) {
      setError("Room URL and token required");
      return;
    }
    // connect(roomUrl, token);
  };

  if (!session) {
    return <div className="p-8">Login to join calls.</div>;
  }

  return (
    <div className="min-h-screen p-8">
      <h2 className="text-2xl font-bold mb-4">Calls / Conferences</h2>
      <form onSubmit={handleJoin} className="flex gap-2 mb-4">
        <input
          type="text"
          value={roomUrl}
          onChange={e => setRoomUrl(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="LiveKit Room URL"
        />
        <input
          type="text"
          value={token}
          onChange={e => setToken(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="Access Token"
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Join</button>
      </form>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {/* <LiveKitRoom url={roomUrl} token={token} /> */}
      <div className="mt-4">LiveKit integration coming soon.</div>
    </div>
  );
}
