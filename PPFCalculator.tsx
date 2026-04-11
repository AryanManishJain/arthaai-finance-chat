import { useState } from "react";
import { Calculator, TrendingUp, IndianRupee, Clock } from "lucide-react";

const PPF_RATE = 0.071;

function formatINR(value: number): string {
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(2)} Cr`;
  } else if (value >= 100000) {
    return `₹${(value / 100000).toFixed(2)} L`;
  }
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

function calculatePPF(monthlyInvestment: number, years: number): {
  maturity: number;
  totalInvested: number;
  totalInterest: number;
} {
  const annualInvestment = monthlyInvestment * 12;
  let balance = 0;
  for (let y = 0; y < years; y++) {
    balance = (balance + annualInvestment) * (1 + PPF_RATE);
  }
  const totalInvested = annualInvestment * years;
  const totalInterest = balance - totalInvested;
  return { maturity: balance, totalInvested, totalInterest };
}

export default function PPFCalculator() {
  const [monthly, setMonthly] = useState<string>("5000");
  const [years, setYears] = useState<string>("15");

  const monthlyNum = parseFloat(monthly) || 0;
  const yearsNum = Math.min(Math.max(Math.floor(parseFloat(years) || 0), 0), 50);

  const result = monthlyNum > 0 && yearsNum > 0
    ? calculatePPF(monthlyNum, yearsNum)
    : null;

  const returnPercent = result
    ? ((result.totalInterest / result.totalInvested) * 100).toFixed(0)
    : null;

  return (
    <div className="glass-card rounded-2xl flex flex-col h-[600px] overflow-y-auto scrollbar-thin">
      <div className="px-5 py-4 border-b border-white/10 flex items-center gap-3 flex-shrink-0">
        <div className="w-8 h-8 rounded-lg bg-green-500/20 border border-green-400/30 flex items-center justify-center">
          <Calculator className="w-4 h-4 text-green-300" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-white">PPF Calculator</h2>
          <p className="text-xs text-blue-300/60">7.1% p.a. interest rate</p>
        </div>
      </div>

      <div className="p-5 space-y-5 flex-1">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-blue-300/80 uppercase tracking-wider">
            Monthly Investment
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 text-sm font-medium">₹</span>
            <input
              type="number"
              value={monthly}
              onChange={(e) => setMonthly(e.target.value)}
              min={500}
              max={12500}
              step={500}
              placeholder="500 – 12,500"
              className="input-glass w-full text-white text-sm pl-7 pr-4 py-2.5 rounded-xl transition-all focus:outline-none"
            />
          </div>
          <input
            type="range"
            min={500}
            max={12500}
            step={500}
            value={monthlyNum || 500}
            onChange={(e) => setMonthly(e.target.value)}
            className="w-full accent-blue-400 h-1.5 rounded-full cursor-pointer"
          />
          <div className="flex justify-between text-xs text-white/30">
            <span>₹500</span>
            <span>₹12,500/month</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-blue-300/80 uppercase tracking-wider">
            Investment Duration
          </label>
          <div className="relative">
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 text-sm">yrs</span>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              min={1}
              max={50}
              placeholder="1 – 50"
              className="input-glass w-full text-white text-sm px-4 pr-12 py-2.5 rounded-xl transition-all focus:outline-none"
            />
          </div>
          <input
            type="range"
            min={1}
            max={50}
            step={1}
            value={yearsNum || 1}
            onChange={(e) => setYears(e.target.value)}
            className="w-full accent-green-400 h-1.5 rounded-full cursor-pointer"
          />
          <div className="flex justify-between text-xs text-white/30">
            <span>1 year</span>
            <span>50 years</span>
          </div>
        </div>

        {result ? (
          <div className="space-y-3 pt-2">
            <div className="rounded-xl bg-gradient-to-br from-blue-500/15 to-blue-600/10 border border-blue-400/20 p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-green-300" />
                <span className="text-xs font-semibold text-green-300 uppercase tracking-wider">Maturity Amount</span>
              </div>
              <p className="text-3xl font-bold text-white">{formatINR(result.maturity)}</p>
              <p className="text-xs text-blue-300/60 mt-1">after {yearsNum} year{yearsNum !== 1 ? "s" : ""}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <IndianRupee className="w-3 h-3 text-blue-300" />
                  <span className="text-xs text-blue-300/70">Invested</span>
                </div>
                <p className="text-base font-bold text-white">{formatINR(result.totalInvested)}</p>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <TrendingUp className="w-3 h-3 text-green-300" />
                  <span className="text-xs text-green-300/70">Interest</span>
                </div>
                <p className="text-base font-bold text-green-300">{formatINR(result.totalInterest)}</p>
              </div>
            </div>

            <div className="rounded-xl bg-white/5 border border-white/10 p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-white/50">Return on Investment</span>
                <span className="text-xs font-bold text-green-300">+{returnPercent}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-400 to-green-400 transition-all duration-500"
                  style={{ width: `${Math.min((result.totalInterest / result.maturity) * 100, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-white/30 mt-1">
                <span>Principal</span>
                <span>Interest</span>
              </div>
            </div>

            <div className="rounded-xl bg-blue-500/10 border border-blue-400/20 p-3">
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-blue-300 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-blue-300/70 leading-relaxed">
                  PPF has a mandatory 15-year lock-in period. Partial withdrawals allowed from year 7. Interest is compounded annually and is completely tax-free.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center py-8">
            <div className="text-center">
              <Calculator className="w-10 h-10 text-white/20 mx-auto mb-3" />
              <p className="text-sm text-white/30">Enter amount and duration to see your PPF projection</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
