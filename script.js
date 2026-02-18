const messagesEl = document.getElementById("messages");
const inputEl = document.getElementById("input");
const modeEl = document.getElementById("mode");
const chatForm = document.getElementById("chat-form");
const newChatBtn = document.getElementById("new-chat");
chatForm.addEventListener("submit", onSend);
inputEl.addEventListener("input", autoResize);
inputEl.addEventListener("keydown", onInputKeydown);
newChatBtn?.addEventListener("click", resetChat);
function addMessage(text, role) {
  const node = document.createElement("article");
  node.className = `message ${role}`;
  node.textContent = text;
  messagesEl.appendChild(node);
  messagesEl.scrollTop = messagesEl.scrollHeight;
    return node;
}
function resetChat() {
  messagesEl.innerHTML = "";
  addMessage(
    "New session started. Share your finance goal, timeline, and current situation.",
    "bot"
  );
}
function autoResize() {
  inputEl.style.height = "auto";
  inputEl.style.height = `${Math.min(inputEl.scrollHeight, 180)}px`;
}
function onInputKeydown(event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    chatForm.requestSubmit();
  }
  async function onSend(event) {
  event.preventDefault();
     const prompt = inputEl.value.trim();
  if (!prompt) return;
  addMessage(prompt, "user");
  inputEl.value = "";
    autoResize();
  const pending = addMessage("Thinking...", "bot");
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: prompt,
        mode: modeEl?.value || "general"
      })
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const payload = await response.json();
    pending.textContent = payload.reply;
  } catch (error) {
    pending.textContent =
      "I hit a temporary issue. Try again, or simplify your finance question in one sentence.";
    console.error(error);
  }
    }
    
