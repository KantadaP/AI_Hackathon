import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useContext } from "react";
import { QuestionsContext } from "../../contexts/QuestionsContext"; // adjust path if needed

function ChatPage({ agent_id }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [threadId, setThreadId] = useState(null);

  const { surveyId } = useParams();
  const { setQuestions } = useContext(QuestionsContext);

  useEffect(() => {
    const startNewThread = async () => {
      try {
        const res = await axios.get("http://localhost:8000/thread");
        setThreadId(res.data.threadId);
        console.log("Thread created:", res.data.threadId);
      } catch (err) {
        console.error("Failed to create thread", err);
      }
    };

    startNewThread();
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    if (!threadId) {
      console.warn("Thread ID is not ready yet!");
      return;
    }

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const res = await axios.post("http://localhost:8000/chat", {
        message: input,
        threadId,
        agent_ai: agent_id,
      });

      const contents = res.data.content;

      // Extract code block wrapped in triple single quotes
      const match = contents.match(/'''([\s\S]*?)'''/);

      let code = "";
      let text = contents.trim();

      if (match) {
        code = match[1].trim();
        text = contents.replace(match[0], "").replace(/\n{2,}/g, "\n").trim();
        let parsedQuestions;
        try {
          parsedQuestions = JSON.parse(code);
          setQuestions(parsedQuestions); // ✅ Update context instead of localStorage
        } catch (e) {
          console.error("Failed to parse survey code as JSON", e);
        }

      }

      const botMsg = { role: "assistant", content: text };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const errorMsg = {
        role: "assistant",
        content: "Error: Unable to fetch response.",
      };
      setMessages((prev) => [...prev, errorMsg]);
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
          <i className="fa-solid fa-paperclip"></i>
        </button>
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

export default ChatPage;
