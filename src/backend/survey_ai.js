import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { AIProjectClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
export let extractedJsonData = null;

const app = express();
app.use(cors());
app.use(bodyParser.json());

async function new_thread() {
  const project = new AIProjectClient(
    "https://kanta-mbntewba-eastus2.services.ai.azure.com/api/projects/kanta-mbntewba-eastus2-project",
    new DefaultAzureCredential("ef9vRYmIHHvXISGd4jMi3oI8huGNPACx3hWgJFfNcfQpNAE4NwKEJQQJ99BFACHYHv6XJ3w3AAAAACOGxhQ8")
  );

  const thread = await project.agents.threads.create();
  return thread.id
}

app.get("/thread", async (req, res) => {
  try {
    const thread_id = await new_thread();
    res.json({ threadId: thread_id });
    console.log(`Created new thread ID: ${thread_id}`);
  } catch (err) {
    console.error("Failed to create thread:", err);
    res.status(500).json({ error: "Could not create new thread" });
  }
});

async function survey_ai(contents, threadid, agent_ai) {
  const project = new AIProjectClient(
    "https://kanta-mbntewba-eastus2.services.ai.azure.com/api/projects/kanta-mbntewba-eastus2-project",
    new DefaultAzureCredential("ef9vRYmIHHvXISGd4jMi3oI8huGNPACx3hWgJFfNcfQpNAE4NwKEJQQJ99BFACHYHv6XJ3w3AAAAACOGxhQ8")
  );

  const agent = await project.agents.getAgent(agent_ai);
  console.log(`Retrieved agent: ${agent.name}`);

  const thread = await project.agents.threads.get(threadid);
  console.log(`Retrieved thread, thread ID: ${thread.id}`);

  const message = await project.agents.messages.create(thread.id, "user", contents);
  console.log(`Created message, message ID: ${message.id}`);

  // Create run
  let run = await project.agents.runs.create(thread.id, agent.id);

  // Poll until the run reaches a terminal status
  while (run.status === "queued" || run.status === "in_progress") {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    run = await project.agents.runs.get(thread.id, run.id);
  }

  if (run.status === "failed") {
    console.error(`Run failed: `, run.lastError);
    return "Agent run failed.";
  }

  // Get the latest assistant message only
  const messages = await project.agents.messages.list(thread.id, { order: "desc", top: 1 });
  const latest = await messages.next();
  const m = latest.value;

  if (m && m.role === "assistant") {
    const content = m.content.find((c) => c.type === "text" && "text" in c);
    if (content) {
      const fullText = content.text.value;

      return fullText; // ✅ return only the clean assistant text (no JSON)
    }
  }
  
  return "No assistant response found.";
}

app.post("/chat", async (req, res) => {
  try {
    const { message: userMessage, threadId, agent_ai } = req.body;
    if (!userMessage || !threadId) {
      return res.status(400).json({ error: "Message and threadId are required" });
    }
    const reply = await survey_ai(userMessage, threadId, agent_ai); // Pass threadId here
    res.json({ content: reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});