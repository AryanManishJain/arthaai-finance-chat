const messagesEl = document.getElementById("messages");
const inputEl = document.getElementById("input");
const focusEl = document.getElementById("focus");
const chatForm = document.getElementById("chat-form");
const newChatBtn = document.getElementById("new-chat");

const financeKeywords = [
  "finance",
  "money",
  "budget",
  "saving",
  "invest",
  "stock",
  "sip",
  "loan",
  "emi",
  "credit",
  "startup",
  "burn",
  "runway",
  "cash flow",
  "tax",
  "mutual fund",
  "profit",
  "revenue",
  "valuation"
];

const fallbackReplies = [
  "Start with a budget rule (50/30/20) and automate savings before investing.",
  "For startups, track runway (cash / monthly burn) every week.",
  "Avoid concentration risk: diversify by asset class and time horizon.",
  "Emergency fund first, then debt reduction, then long-term investing.",
  "Decide with numbers: CAC, LTV, gross margin, and payback period."
];

chatForm.addEventListener("submit", onSend);
newChatBtn.addEventListener("click", newChat);

async function onSend(event) {
  event.preventDefault();
  const text = inputEl.value.trim();
  if (!text) return;

  addMessage(text, "user");
  inputEl.value = "";

  if (!isFinanceQuestion(text)) {
    addMessage(
      "I’m finance-only right now. Ask about budgeting, investing, startup metrics, loans, or taxes.",
      "bot"
    );
    return;
  }

  const loading = addMessage("Thinking...", "bot");

  try {
    const reply = await getBackendReply(text, focusEl.value);
    typeText(loading, reply);
  } catch {
    typeText(
      loading,
      fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)]
    );
  }
}

function addMessage(text, type) {
  const div = document.createElement("div");
  div.className = `message ${type}`;
  div.textContent = text;
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
  return div;
}

function typeText(element, text, speed = 10) {
  element.textContent = "";
  let index = 0;

  function type() {
    if (index < text.length) {
      element.textContent += text[index];
      index += 1;
      setTimeout(type, speed);
    }
  }

  type();
}

function isFinanceQuestion(text) {
  const lower = text.toLowerCase();
  return financeKeywords.some((keyword) => lower.includes(keyword));
}

async function getBackendReply(question, focus) {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ question, focus })
  });

  if (!response.ok) {
    throw new Error("Backend request failed");
  }

  const data = await response.json();
  return data.reply;
}
