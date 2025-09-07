import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ChatPage() {
  const { data: session } = useSession();
  const t = useTranslations();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [error, setError] = useState("");

  const fetchMessages = async () => {
    try {
      const res = await axios.get("/api/chat");
      setMessages(res.data.messages);
    } catch (err) {
      setError("Failed to fetch messages");
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return;
    try {
      await axios.post("/api/chat", { content: message });
      setMessage("");
      fetchMessages();
    } catch (err) {
      setError("Failed to send message");
    }
  };

  // Fetch messages on mount
  useEffect(() => {
    fetchMessages();
  }, []);

  if (!session) {
    return <div className="p-8">{t('login')} {t('chat')}</div>;
  }

  return (
    <div className="min-h-screen p-8">
      <h2 className="text-2xl font-bold mb-4">Chat</h2>
      <form onSubmit={sendMessage} className="flex gap-2 mb-4">
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="Type your message..."
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
      </form>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
        {messages.length === 0 ? (
          <div>No messages yet.</div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className="mb-2">
              <span className="font-bold">{msg.sender?.name || "User"}:</span> {msg.content}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
