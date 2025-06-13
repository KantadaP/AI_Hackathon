import { useState, useEffect } from "react";
import axios from "axios";

function App({ agent_id }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [threadId, setThreadId] = useState(null);
  const [isThinking, setIsThinking] = useState(false);

  useEffect(() => {
    const startNewThread = async () => {
      try {
        const res = await axios.get("http://localhost:8000/thread");
        setThreadId(res.data.threadId);
      } catch (err) {
        console.error("Failed to create thread", err);
      }
    };
    startNewThread();
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || !threadId) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsThinking(true);

    let surveys = [];
    try {
      const surveysRaw = localStorage.getItem("surveys");
      if (surveysRaw) surveys = JSON.parse(surveysRaw);

      const responses = Object.entries(localStorage)
        .filter(([key]) => key.startsWith("responses_"))
        .flatMap(([key, value]) => {
          try {
            const parsed = JSON.parse(value);
            return Array.isArray(parsed) ? parsed : [parsed];
          } catch {
            return [];
          }
        });

      surveys = surveys.map(survey => ({
        ...survey,
        responses: responses.filter(res => String(res.s_id) === String(survey.s_id))
      }));
    } catch (err) {
      console.error("Error processing localStorage data", err);
    }

    try {
      const res = await axios.post("http://localhost:8000/chat", {
        message: input,
        threadId,
        agent_ai: agent_id,
        surveys,
      });

      const botMsg = { role: "assistant", content: res.data.content };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const errorMsg = {
        role: "assistant",
        content: "Error: Unable to fetch response.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="w-full h-full bg-white shadow-md p-4">
      <div className="h-[500px] overflow-y-auto border rounded p-2 mb-4 bg-gray-50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`my-2 flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-[75%] ${
                msg.role === "user"
                  ? "bg-green-button text-white"
                  : "bg-gray-300 text-gray-800"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {isThinking && (
          <div className="my-2 flex justify-start">
            <div className="px-4 py-2 rounded-lg max-w-[75%] bg-gray-300 text-gray-800 animate-pulse">
              <span className="inline-block animate-pulse">...</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex">
        <input
          className="flex-grow border rounded-l px-4 py-2 focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
        />
        <button
          className="bg-green-button text-white px-4 py-2 hover:bg-lime-400 transition-colors duration-200"
          onClick={sendMessage}
        >
          <i className="fa-solid fa-paper-plane-top -rotate-45"></i>
        </button>
      </div>
    </div>
  );
}

export default App;
