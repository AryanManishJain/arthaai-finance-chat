ArthaAI Finance Chat

A clean starter for building a finance-only AI assistant with a preloaded HTML, CSS, and JavaScript frontend and a lightweight Node/Express backend, with an additional PHP API endpoint for server-side processing.

What this project now includes

Working frontend chat UI
(index.html, style.css, script.js)

Finance mode selector

general

startup

investing

budgeting

tax

Backend endpoint
POST /api/chat

Optional PHP backend endpoint
POST /api/chat.php

Finance-topic gate
Rejects non-finance prompts.

Safety guardrails for risky, illegal, or “guaranteed returns” style requests.

Educational disclaimer included in responses.

Quick start

Install dependencies using npm install.

Start the Node server using npm start.

Then open the application in your browser at:
http://localhost:3000

PHP backend (optional demo integration)

This project also includes a PHP API endpoint to demonstrate server-side processing using PHP.

The PHP file is located in the api folder as chat.php.

The frontend can send chat requests to the PHP endpoint, which processes the finance-related prompt and returns a structured response.

This demonstrates how a JavaScript frontend can communicate with a PHP backend API.

To run the PHP backend locally, you can use development tools such as:

XAMPP

MAMP

Then open the project using a localhost server environment.

How to build a “100% finance AI” (practical path)

You can’t make any AI truly 100% perfect, but you can make it strong, safe, and finance-specialized.

1) Keep frontend as the base

Use your existing components:

index.html for structure
style.css for user interface clarity and trust
script.js for sending user prompts to the backend

2) Move intelligence to backend

Never place API keys in frontend JavaScript.

Keep all model calls inside the backend, such as server.js or a service layer.

Best practices include validating and sanitizing input before model calls, adding request limits, and enabling logging.

3) Add strict finance system policy

Every model request should include policy instructions such as:

Stay within the finance domain

Do not promise guaranteed investment returns

Do not provide illegal guidance such as fraud, insider trading, or tax evasion

Provide educational explanations

Show uncertainty when financial data is incomplete

4) Build a retrieval layer (RAG)

Use trusted financial knowledge sources such as regulator documentation, product documentation, internal SOPs, and investment policies.

Documents can be stored in a vector database and relevant context injected into AI responses.

5) Add risk and suitability checks

Before returning financial advice, the system should gather key information such as:

Goal amount and deadline
Income and cash-flow stability
Emergency fund status
Debt obligations
Risk tolerance

6) Add compliance and human escalation

Responsible financial systems should include:

An educational disclaimer in the interface
Suggestions to consult licensed professionals for tax or legal advice
Audit logging for sensitive financial recommendations

7) Measure quality continuously

Track important system metrics such as:

Hallucination rate
Refusal correctness
User follow-through and outcomes
User satisfaction by topic

Regular red-team testing helps ensure the system remains safe and accurate.

Suggested next improvements

Possible improvements for this project include:

Connecting the backend to a real AI model provider
Adding user profiles and conversation memory using a database
Adding financial calculators such as SIP, EMI, startup runway, and debt payoff planners
Adding visual charts for budgeting and investment tracking
Adding authentication and role-based access
Adding automated tests for domain guardrails and unsafe prompts
