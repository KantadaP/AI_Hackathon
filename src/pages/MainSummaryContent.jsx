import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";

function MainSummaryContent({ agent_id }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [threadId, setThreadId] = useState(null);
  const [isThinking, setIsThinking] = useState(false);
  const { surveyId } = useParams();

  agent_id = "asst_PNbAvoIntsdYhNwihVhn8NK6";

  useEffect(() => {
    const initThread = async () => {
      const res = await axios.get("https://survery.onrender.com/thread");
      setThreadId(res.data.threadId);
      console.log("Thread summarize created:", res.data.threadId);

      try {
        const key = `responses_${surveyId}`;
        const raw = localStorage.getItem(key);
        if (!raw) {
          console.warn("No survey responses found in localStorage");
          return;
        }

        // Send the readable survey data text as initial message to the thread
        await axios.post("https://survery.onrender.com/chat", {
          message: raw,
          threadId: res.data.threadId,
          agent_ai: agent_id,
        });
        } catch (err) {
          console.error("Failed to get survey responses, create thread or send initial data", err);
      }
    };
      initThread();
  }, [surveyId, agent_id]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    if (!threadId) {
      console.warn("Thread ID is not ready yet!");
      return;
    }

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsThinking(true);

    try {
      const res = await axios.post("https://survery.onrender.com/chat", {
        message: input,
        threadId,
        agent_ai: agent_id,
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
            className={`my-2 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
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
          className="bg-green-button text-white px-4 py-2 rounded-r hover:bg-lime-400 transition-colors duration-200"
          onClick={sendMessage}
        >
          <i className="fa-solid fa-paper-plane-top -rotate-45"></i>
        </button>
      </div>
    </div>
  );
}

export default MainSummaryContent;
