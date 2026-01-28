# GitHub Issue Analyzer

GitHub Issue Analyzer is a backend service that fetches open issues from a GitHub repository, caches them locally, and uses a Large Language Model (LLM) to analyze recurring themes and recommend what maintainers should prioritize.

This project was built as a take-home assignment to demonstrate backend design, data persistence, API integration, and natural-language analysis using an LLM while handling real-world constraints such as context limits and performance.

---

## ✨ Features

- Fetches and caches open GitHub issues for any public repository
- Stores issue data locally using PostgreSQL and Prisma
- Analyzes cached issues using a natural-language prompt and an LLM
- Handles LLM context limits using truncation and controlled input size
- Provides a minimal frontend to trigger scans and view analysis results
- Uses a local LLM to avoid paid API dependencies and rate limits

---

## 🛠 Tech Stack & Why It Was Chosen

### Backend

**Node.js + TypeScript**  
Chosen for type safety, maintainability, and alignment with modern backend best practices.

**Express**  
Lightweight and sufficient for building a small API-focused service.

**Prisma ORM**  
Provides type-safe database access, clean schema management, and easy migrations.

**PostgreSQL**  
Used as a durable local cache for GitHub issues. This ensures data persists across server restarts and allows reliable querying.

---

### LLM & Analysis

**Ollama (local LLM – phi-3 mini)**  
A local LLM was used because OpenAI’s API requires billing to be enabled even for initial usage.  
Using Ollama ensures:
- No API costs
- No rate limits
- The project can be run entirely offline

**marked**  
Used to render Markdown-formatted LLM responses cleanly in the frontend.

---

### Frontend

**Tailwind CSS**  
Used only for minimal styling to make the demo readable and presentable.  
UI complexity was intentionally kept low to focus on backend functionality.

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

2. Environment variables

Create a .env file in the project root:
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/github_issue_analyzer


3. Prisma setup
```bash
npx prisma generate
npx prisma migrate dev
```

4. Run in development mode
```bash
npm run dev
```

5. Build and run (production-style)
```bash
npm run build
npm start
```


6. Open the app
http://localhost:3000

📡 API Endpoints
POST /scan
Fetches all open issues from the GitHub API and caches them locally.

Request
{
  "repo": "owner/repo"
}


Response
{
  "repo": "owner/repo",
  "issues_fetched": 14,
  "cached_successfully": true
}



POST /analyze
Analyzes cached issues using an LLM and a natural-language prompt.
Request
{
  "repo": "owner/repo",
  "prompt": "Identify recurring issues and recommend priorities"
}


Response
{
  "analysis": "<LLM-generated analysis text>"
}



🧠 LLM Choice & Design Decisions
A local LLM (phi-3 mini) was selected instead of a hosted provider because:
OpenAI’s API returns 429 errors unless billing is enabled
The assignment allows any LLM provider or local model
Using a local model removes external dependencies and cost concerns
The LLM integration is abstracted and can easily be swapped with a hosted provider if needed.


📏 Context Management (Key Assignment Requirement)
One of the main challenges faced during development was LLM context size and performance, especially when analyzing repositories with verbose issues.
To address this:
Only a limited number of issues are analyzed per request
Issue bodies are truncated to a safe length
A strict Markdown response format is enforced via prompt design
This ensures:
Predictable performance
No timeouts when using local CPU-based models
Consistent, readable output


