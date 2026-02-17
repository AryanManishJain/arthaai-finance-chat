# ArthaAI Finance Chat

Finance-focused AI assistant starter kit using preloaded HTML, CSS, and JavaScript, with a lightweight Node/Express backend.

## What was improved
- Split frontend into clean files (`index.html`, `style.css`, `script.js`).
- Added **finance-only guardrails** in the UI and client logic.
- Added focus modes (general, startup, investing, budgeting, tax).
- Added backend API endpoint (`POST /api/chat`) for production-ready architecture.
- Added safe-response behavior for risky/"guaranteed return" prompts.

## Quick start
```bash
npm install
npm start
```
Then open `http://localhost:3000`.

## How to build a “100% finance AI” properly
1. **Keep finance scope strict**
   - Add topic classification (finance vs non-finance).
   - Reject non-finance queries with a friendly redirect.
2. **Use strong system prompts**
   - Include constraints: no legal/tax certainty, no guaranteed returns, educational tone.
3. **Ground answers in data**
   - Use a retrieval layer with trusted finance docs (RBI/SEBI/IRS docs, internal SOPs).
4. **Add compliance guardrails**
   - Block manipulative or illegal requests.
   - Add disclaimers and escalation to human advisor.
5. **Measure quality**
   - Track answer quality, hallucinations, and user outcomes.
   - Add automated test prompts for recurring scenarios.
6. **Personalization layer**
   - Build profiles: risk appetite, goals, investment horizon, cash flow pattern.
7. **Secure backend**
   - Keep API keys server-side only.
   - Add rate limiting, input validation, logging, and auth.

## Suggested next backend upgrades
- Plug in an LLM provider route (OpenAI, Anthropic, etc.).
- Add conversation storage (PostgreSQL + Redis cache).
- Add retrieval pipeline for finance knowledge base.
- Add analytics dashboard for response accuracy and user retention.
