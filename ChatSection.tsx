import { useState, useRef, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";
import { Mode } from "@/pages/HomePage";

interface Message {
  id: number;
  role: "user" | "ai";
  text: string;
  timestamp: Date;
}

function getAIResponse(mode: Mode, input: string): string {
  const query = input.trim().toLowerCase();

  if (mode === "Investing") {
    if (query.includes("ppf") || query === "explain ppf") {
      return "PPF offers stable, government-backed returns with tax benefits.";
    }
    if (query.includes("sip") || query === "what is sip") {
      return "SIP helps build disciplined investing habits through regular contributions.";
    }
    if (query.includes("mutual fund")) {
      return "Mutual funds pool money from multiple investors to invest in diversified portfolios managed by professionals. They offer options from equity to debt based on your risk appetite.";
    }
    if (query.includes("stock") || query.includes("equity")) {
      return "Stocks represent ownership in a company. Long-term equity investing through index funds or diversified portfolios has historically delivered strong returns with manageable risk.";
    }
    if (query.includes("nps") || query.includes("national pension")) {
      return "NPS (National Pension System) is a government-backed retirement scheme offering market-linked returns with tax benefits under Section 80CCD.";
    }
    if (query.includes("fd") || query.includes("fixed deposit")) {
      return "Fixed Deposits offer guaranteed returns with capital protection. Ideal for conservative investors who want predictable income. Interest is taxable as per your slab.";
    }
    if (query.includes("elss")) {
      return "ELSS (Equity Linked Savings Scheme) funds offer the shortest lock-in period (3 years) among tax-saving instruments with potential for higher returns than PPF or FD.";
    }
    return "I can help with investing queries. Try asking about PPF, SIP, mutual funds, ELSS, NPS, or fixed deposits.";
  }

  if (mode === "Tax") {
    if (query.includes("80c") || query === "what is 80c") {
      return "Section 80C currently allows deductions up to ₹1.5 lakh under the old regime.";
    }
    if (query.includes("80d")) {
      return "Section 80D allows deduction on health insurance premiums — up to ₹25,000 for self/family and an additional ₹25,000 for parents (₹50,000 if senior citizens).";
    }
    if (query.includes("hra") || query.includes("house rent")) {
      return "HRA (House Rent Allowance) is exempt from tax up to the least of: actual HRA received, 50% of salary (metro) or 40% (non-metro), and actual rent paid minus 10% of salary.";
    }
    if (query.includes("new regime") || query.includes("old regime")) {
      return "The new tax regime offers lower rates but fewer deductions. The old regime allows deductions under 80C, 80D, HRA, etc. Compare your tax liability under both before choosing.";
    }
    if (query.includes("capital gain")) {
      return "Short-term capital gains (STCG) on equity are taxed at 15%, while long-term capital gains (LTCG) above ₹1 lakh are taxed at 10% without indexation.";
    }
    if (query.includes("tds") || query.includes("tax deducted at source")) {
      return "TDS (Tax Deducted at Source) is advance tax deducted by the payer. You can claim credit for TDS paid while filing your ITR. Excess TDS results in a refund.";
    }
    if (query.includes("itr") || query.includes("income tax return")) {
      return "Filing ITR is mandatory if your income exceeds the basic exemption limit. It also helps you claim refunds, carry forward losses, and serves as income proof for loans/visa.";
    }
    return "I can help with tax queries. Try asking about 80C, 80D, HRA, capital gains, new vs old regime, or TDS.";
  }

  return "Please select a mode (Investing or Tax) to get started.";
}

export default function ChatSection({ mode }: { mode: Mode }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "ai",
      text: `Hello! I'm Artha AI, your personal finance assistant. I'm currently in ${mode} mode. Ask me anything about ${mode === "Investing" ? "investments like PPF, SIP, mutual funds, and more" : "taxes like 80C, 80D, HRA, capital gains, and more"}.`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const prevMode = useRef(mode);

  useEffect(() => {
    if (prevMode.current !== mode) {
      prevMode.current = mode;
      setMessages([{
        id: Date.now(),
        role: "ai",
        text: `Switched to ${mode} mode. Ask me anything about ${mode === "Investing" ? "investments like PPF, SIP, mutual funds, ELSS, NPS, and more" : "taxes like 80C, 80D, HRA, capital gains, TDS, and ITR filing"}.`,
        timestamp: new Date(),
      }]);
    }
  }, [mode]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;

    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const aiText = getAIResponse(mode, text);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "ai",
          text: aiText,
          timestamp: new Date(),
        },
      ]);
    }, 800 + Math.random() * 400);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

  const suggestions = mode === "Investing"
    ? ["Explain PPF", "What is SIP", "What is ELSS", "Tell me about NPS"]
    : ["What is 80C", "Explain HRA", "What is 80D", "New vs Old Regime"];

  return (
    <div className="glass-card rounded-2xl flex flex-col h-[600px]">
      <div className="px-5 py-4 border-b border-white/10 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center">
          <Bot className="w-4 h-4 text-blue-300" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-white">Chat with Artha AI</h2>
          <p className="text-xs text-blue-300/60">{mode} Mode Active</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-green-300">Online</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center ${
              msg.role === "ai"
                ? "bg-blue-500/20 border border-blue-400/30"
                : "bg-white/10 border border-white/20"
            }`}>
              {msg.role === "ai"
                ? <Bot className="w-3.5 h-3.5 text-blue-300" />
                : <User className="w-3.5 h-3.5 text-white/70" />
              }
            </div>
            <div className={`max-w-[78%] group`}>
              <div className={`px-4 py-2.5 text-sm leading-relaxed text-white ${
                msg.role === "user" ? "chat-bubble-user" : "chat-bubble-ai"
              }`}>
                {msg.text}
              </div>
              <p className={`text-xs text-white/30 mt-1 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                {formatTime(msg.timestamp)}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-end gap-2">
            <div className="w-7 h-7 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center flex-shrink-0">
              <Bot className="w-3.5 h-3.5 text-blue-300" />
            </div>
            <div className="chat-bubble-ai px-4 py-3 flex items-center gap-1.5">
              <div className="typing-dot w-2 h-2 rounded-full bg-blue-300" />
              <div className="typing-dot w-2 h-2 rounded-full bg-blue-300" />
              <div className="typing-dot w-2 h-2 rounded-full bg-blue-300" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="px-4 py-2 border-t border-white/5">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => {
                setInput(s);
                inputRef.current?.focus();
              }}
              className="text-xs px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 hover:bg-blue-500/20 hover:border-blue-400/40 transition-all"
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Ask about ${mode === "Investing" ? "PPF, SIP, mutual funds..." : "80C, HRA, capital gains..."}`}
            className="input-glass flex-1 text-white text-sm px-4 py-2.5 rounded-xl placeholder:text-white/30 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="w-10 h-10 rounded-xl bg-blue-500 hover:bg-blue-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center shadow-lg shadow-blue-500/30 flex-shrink-0"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
