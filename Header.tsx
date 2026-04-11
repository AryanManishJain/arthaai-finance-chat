import { Mode } from "@/pages/HomePage";
import { TrendingUp } from "lucide-react";

interface HeaderProps {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
}

export default function Header({ mode, onModeChange }: HeaderProps) {
  return (
    <header className="glass-card border-b border-white/10 sticky top-0 z-10">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
              <TrendingUp className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight">Artha AI</h1>
              <p className="text-xs text-blue-300/80">Your Finance Assistant</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-blue-300/70 hidden sm:block">Mode:</span>
            <div className="relative">
              <select
                value={mode}
                onChange={(e) => onModeChange(e.target.value as Mode)}
                className="appearance-none input-glass text-white text-sm font-medium px-4 py-2 pr-9 rounded-xl cursor-pointer transition-all focus:outline-none"
              >
                <option value="Investing" className="bg-blue-900 text-white">Investing</option>
                <option value="Tax" className="bg-blue-900 text-white">Tax</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg className="w-4 h-4 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
              mode === "Investing"
                ? "bg-blue-500/20 text-blue-300 border border-blue-400/30"
                : "bg-green-500/20 text-green-300 border border-green-400/30"
            }`}>
              {mode}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
