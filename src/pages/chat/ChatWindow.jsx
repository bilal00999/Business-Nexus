import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/useAuth";
import axios from "axios";

const ChatWindow = () => {
  const { user } = useAuth();
  const { userId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chatUser, setChatUser] = useState(null);
  const chatEndRef = useRef(null);

  const LOCAL_KEY = user ? `chat_${user.id}_${userId}` : null;

  useEffect(() => {
    if (!user) return;

    // Get chat user
    axios
      .get(`http://localhost:4001/entrepreneurs/${userId}`)
      .then((res) => setChatUser(res.data))
      .catch(() => {});

    // Load messages from localStorage
    const localData = localStorage.getItem(LOCAL_KEY);
    if (localData) {
      setMessages(JSON.parse(localData));
    } else {
      // Fallback to mock API
      axios.get("http://localhost:4001/messages").then((res) => {
        const filtered = res.data.filter(
          (m) =>
            (m.from === user.id && m.to === parseInt(userId)) ||
            (m.from === parseInt(userId) && m.to === user.id)
        );
        setMessages(filtered);
        localStorage.setItem(LOCAL_KEY, JSON.stringify(filtered));
      });
    }
  }, [LOCAL_KEY, user?.id, userId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Add null check for user after hooks
  if (!user) {
    return (
      <div className="max-w-2xl mx-auto mt-16 p-6 bg-white shadow-lg rounded-2xl dark:bg-gray-900">
        <h2 className="text-2xl font-bold text-red-600 mb-4 text-center">
          Please log in to access chat
        </h2>
      </div>
    );
  }

  const handleSend = () => {
    if (!input.trim()) return;

    const newMsg = {
      id: Date.now(),
      from: user.id,
      to: parseInt(userId),
      message: input,
      timestamp: new Date().toISOString(),
    };

    const updated = [...messages, newMsg];
    setMessages(updated);
    setInput("");

    // Save locally
    localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));

    // Simulate saving to server
    axios.post("http://localhost:4001/messages", newMsg).catch(console.error);
  };

  return (
    <div
      className="max-w-2xl mx-auto mt-16 p-6 shadow-lg rounded-2xl h-[80vh] flex flex-col dark:bg-gray-900 transition-all "
      style={{
        background: "linear-gradient(to right, #ec4899, #8b5cf6)",
      }}
    >
      <h2 className="text-2xl font-bold text-pink-200 mb-4 text-center">
        Chat with {chatUser?.name || "Loading..."}
      </h2>

      {/* Chat messages container */}
      <div className="flex-1 overflow-y-auto space-y-3 p-4 rounded bg-pink-200 dark:bg-gray-800 border dark:border-gray-700">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.from === user.id ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-xl max-w-xs text-sm shadow-md
            ${
              msg.from === user.id
                ? "bg-pink-600 text-white"
                : "bg-gray-300 text-gray-900 dark:bg-gray-700 dark:text-white"
            }`}
            >
              {msg.message}
              <div className="text-[10px] text-right mt-1 opacity-70">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>

      {/* Message input */}
      <div className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
        />
        <button
          onClick={handleSend}
          className="bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 rounded-lg font-medium transition-all"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
