:root {
  color-scheme: dark;
}
 {
  box-sizing: border-box;
}
body {
  margin: 0;
min-height: 100vh;
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  background: #050c1a;
  color: #e5e7eb;
}
.screen {
  min-height: 100vh;
  padding: 8px 10px;
}
.chat-panel {
  min-height: calc(100vh - 16px);
  border: 1px solid #27364d;
  background: linear-gradient(90deg, #07122a 0%, #061126 100%);
}
.messages {
  height: 56px;
  overflow-y: auto;
  border-bottom: 1px solid rgba(148, 163, 184, 0.15);
}
.message {
  padding: 8px 10px;
  font-size: 20px;
  line-height: 1.15;
}
.bot {
  color: #e5e7eb;
}
.intro {
  font-size: 46px;
  line-height: 1.1;
}
.user {
  color: #dbeafe;
}
.composer {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 6px 10px 0;
}
input,
button {
  border-radius: 20px;
  border: 2px solid #334b6b;
  background: #1a2740;
  color: #f8fafc;
  font-size: 18px;
}
input {
width: 100%;
  padding: 22px 24px;
}
input::placeholder {
  color: #7e8795;
}
button {
width: 140px;
  padding: 18px 18px;
  font-size: 42px;
  line-height: 1;
  cursor: pointer;
}
button:hover {
background: #243452;
}
@media (max-width: 1024px) {
  .intro {
    font-size: 26px;
const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: "256kb" }));
app.use(express.static(path.join(__dirname)));

const FINANCE_KEYWORDS = [
  "finance",
  "money",
  "budget",
  "save",
  "saving",
  "invest",
  "stock",
  "bond",
  "mutual fund",
  "etf",
  "sip",
  "loan",
  "emi",
  "credit",
  "debt",
  "startup",
  "burn",
  "runway",
  "cash flow",
  "tax",
  "income",
  "expense",
  "profit",
  "revenue",
  "valuation",
  "retirement"
];

const MODE_GUIDANCE = {
  general: "Focus on practical finance fundamentals and decision frameworks.",
  startup: "Focus on runway, burn, CAC, LTV, gross margin, and funding readiness.",
  investing: "Focus on diversification, risk tolerance, and long-term asset allocation.",
  budgeting: "Focus on cash-flow discipline, debt reduction, and emergency buffers.",
  tax: "Share educational tax basics and suggest speaking to a licensed tax professional for filing decisions."
};

const SAFE_FALLBACKS = [
  "Start with a monthly cash-flow map: income, fixed costs, variable costs, and automated savings.",
  "Use a 3-layer approach: emergency fund first, then high-interest debt, then long-term investing.",
  "For investing decisions, align your portfolio with timeline + risk tolerance before selecting products.",
  "For startups, monitor runway weekly: runway = cash balance / monthly net burn."
];

function isFinancePrompt(message) {
  const text = String(message || "").toLowerCase();
  return FINANCE_KEYWORDS.some((keyword) => text.includes(keyword));
}

function detectRiskyClaims(message) {
  const text = String(message || "").toLowerCase();
  return (
    text.includes("guaranteed return") ||
    text.includes("double my money") ||
    text.includes("insider trading") ||
    text.includes("tax evasion")
  );
}

function generateReply(message, mode) {
  if (!isFinancePrompt(message)) {
    return "I’m a finance-only assistant right now. Ask about budgeting, investing, startup metrics, loans, taxes, or risk planning.";
  }
  if (detectRiskyClaims(message)) {
    return "I can’t help with illegal or guaranteed-return requests. I can help you build a legal, risk-aware finance plan instead.";
  }
  const guidance = MODE_GUIDANCE[mode] || MODE_GUIDANCE.general;
  const fallback = SAFE_FALLBACKS[Math.floor(Math.random() * SAFE_FALLBACKS.length)];

  return [
    `Mode: ${mode || "general"}. ${guidance}`,
    "\nNext steps:",
    "1) Clarify your target amount and deadline.",
    "2) Share your monthly surplus and current liabilities.",
    "3) Choose a risk range (conservative / balanced / aggressive).",
    `\nStarter suggestion: ${fallback}`,
    "\nNote: This is educational, not personalized investment, tax, or legal advice."
  ].join("\n");
}
app.post("/api/chat", (req, res) => {
  const { message, mode = "general" } = req.body || {};
  if (typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ error: "message is required" });
  }
   const reply = generateReply(message.trim(), mode);
  return res.json({ reply });
});

app.listen(port, () => {
  console.log(`ArthaAI running on http://localhost:${port}`);
});
