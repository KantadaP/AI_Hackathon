// survey_ai.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import axios from "axios";
import { AIProjectClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const endpoint = "https://kanta-mbntewba-eastus2.openai.azure.com";
const apiKey = "ef9vRYmIHHvXISGd4jMi3oI8huGNPACx3hWgJFfNcfQpNAE4NwKEJQQJ99BFACHYHv6XJ3w3AAAAACOGxhQ8";
const apiVersion = "2024-02-15-preview";

async function runAgentConversation(contents, threadid, agent_ai) {
  console.log("runAgentConversation started");
  const project = new AIProjectClient(
    "https://kanta-mbntewba-eastus2.services.ai.azure.com/api/projects/kanta-mbntewba-eastus2-project",
    new DefaultAzureCredential(apiKey)
  );

  try {
    const agent = await project.agents.getAgent(agent_ai);
    const thread = await project.agents.threads.get(threadid);

    await project.agents.messages.create(thread.id, "user", contents);
    let run = await project.agents.runs.create(thread.id, agent.id);

    while (run.status === "queued" || run.status === "in_progress") {
      await new Promise(resolve => setTimeout(resolve, 1000));
      run = await project.agents.runs.get(thread.id, run.id);
    }

    if (run.status === "failed") {
      const errorInfo = run.lastError;
      if (errorInfo?.code === "rate_limit_exceeded") {
        const match = errorInfo.message.match(/Try again in (\d+) seconds?/);
        const seconds = match ? match[1] : "a few";
        return `Rate limit exceeded. Try again in ${seconds} seconds.`;
      }
      return "Agent run failed.";
    }

    const messages = await project.agents.messages.list(thread.id, { order: "desc", top: 1 });
    const latest = await messages.next();
    const m = latest.value;

    if (m && m.role === "assistant") {
      const content = m.content.find(c => c.type === "text" && "text" in c);
      return content?.text?.value || "No assistant response found.";
    }

    return "No assistant response found.";
  } catch (error) {
    console.error("Error in runAgentConversation:", error.response?.data || error.message || error);
    return "Agent conversation error.";
  }
}

app.post("/chat", async (req, res) => {
  try {
    const { message: userMessage, threadId, agent_ai, surveys } = req.body;

    if (!userMessage || !threadId || !agent_ai) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const enrichedInput = `Survey Data: ${JSON.stringify(surveys, null, 2)}\n\nUser: ${userMessage}`;
    const reply = await runAgentConversation(enrichedInput, threadId, agent_ai);
    res.json({ content: reply });
  } catch (err) {
    res.status(500).json({ error: err.message || "Server error" });
  }
});

app.get("/thread", async (req, res) => {
  try {
    const project = new AIProjectClient(
      "https://kanta-mbntewba-eastus2.services.ai.azure.com/api/projects/kanta-mbntewba-eastus2-project",
      new DefaultAzureCredential(apiKey)
    );
    const thread = await project.agents.threads.create();
    res.json({ threadId: thread.id });
  } catch (err) {
    res.status(500).json({ error: "Could not create new thread" });
  }
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
