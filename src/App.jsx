import { useState } from "react";
import axios from "axios";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const res = await axios.post("http://localhost:8000/chat", {
        message: input,
      });

      const botMsg = { role: "assistant", content: res.data.content };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const errorMsg = {
        role: "assistant",
        content: "Error: Unable to fetch response.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    }
  };

  const uploadDocument = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const userMsg = { role: "user", content: `Uploaded: ${file.name}` };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await axios.post(
        "http://localhost:8000/upload-doc",
        formData
      );
      const botMsg = { role: "assistant", content: res.data.content };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const errorMsg = {
        role: "assistant",
        content: "Error: Unable to analyze document.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-4">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          AI Chat Assistant
        </h1>

        <div className="mb-4">
          <input
            type="file"
            accept=".pdf,.jpg,.png"
            onChange={(e) => {
              if (e.target.files[0]) {
                uploadDocument(e.target.files[0]);
              }
            }}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-md file:bg-blue-500 file:text-white hover:file:bg-blue-600"
          />
        </div>

        <div className="h-96 overflow-y-auto border rounded p-2 mb-4 bg-gray-50">
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
                    ? "bg-blue-500 text-white"
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
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
