const messagesEl = document.getElementById("messages");
const inputEl = document.getElementById("input");
const modeEl = document.getElementById("mode");
const chatForm = document.getElementById("chat-form");
function addMessage(text, role) {
  const node = document.createElement("article");
  node.className = `message ${role}`;
  node.textContent = text;
  messagesEl.appendChild(node);
  messagesEl.scrollTop = messagesEl.scrollHeight;
    return node;
}
const prompt = inputEl.value.trim();
  if (!prompt) return;
  addMessage(prompt, "user");
  const pending = addMessage("Thinking...", "bot");
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: prompt,
        mode: modeEl.value
      })
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
       const payload = await response.json();
    pending.textContent = payload.reply;
  } catch (error) {
    pending.textContent =
      "I hit a temporary issue. Try again, or simplify your finance question in one sentence.";
    console.error(error);
  }
}
