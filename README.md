# InvestIQ AI

AI-Powered Investment Research Agent built using the MERN stack, Google Gemini, LangChain/LangGraph, and source-backed company research.

## Live Demo

Add your deployed application URL here after deployment.

## 1. Overview

InvestIQ AI is a full-stack AI Investment Research Agent that helps users research publicly listed companies and generate explainable investment recommendations.

A user enters a company name, and the application collects relevant company information from external data sources, processes the collected evidence through an AI-powered analysis workflow, evaluates multiple investment dimensions, and generates a structured recommendation.

The final report includes:

* Company and business overview
* Financial health analysis
* Growth potential
* Competitive position
* Risk profile
* Recent developments
* Overall investment score
* INVEST, WATCH, or PASS recommendation
* Confidence score
* Investment thesis
* Key strengths
* Key risks
* Analysis limitations
* Supporting research sources

Research reports are stored in MongoDB so previous analyses can be viewed again through the research history interface.

## 2. Features

* AI-powered public company research
* Source-backed company analysis
* Google Gemini integration
* LangChain/LangGraph-based AI workflow
* Structured AI responses
* Deterministic investment scoring
* Explainable INVEST, WATCH, or PASS recommendations
* Financial health analysis
* Growth potential analysis
* Competitive position analysis
* Risk analysis
* Recent developments analysis
* Confidence and limitations reporting
* Clickable supporting sources
* MongoDB research persistence
* Research history
* Responsive React dashboard
* Centralized backend error handling
* Environment-based configuration

## 3. Tech Stack

### Frontend

* React.js
* Vite
* JavaScript
* CSS

### Backend

* Node.js
* Express.js
* JavaScript

### AI and Agent Workflow

* Google Gemini API
* LangChain.js
* LangGraph.js

### Database

* MongoDB
* Mongoose

### External Research

* Tavily Search API or the research provider configured in the project

## 4. Architecture

The application follows a modular architecture that separates the user interface, API layer, AI workflow, research tools, scoring logic, and database persistence.

```text
React Frontend
        |
        v
Express REST API
        |
        v
Research Controller
        |
        v
LangGraph Workflow
        |
        +----------------------------+
        |                            |
        v                            v
Company Resolution           Web Research Tool
                                     |
                                     v
                              Evidence Collection
                                     |
                                     v
                           Evidence Normalization
                                     |
                                     v
                  +------------------+------------------+
                  |                  |                  |
                  v                  v                  v
          Financial Analysis   Growth Analysis    Risk Analysis
                  |                  |                  |
                  +------------------+------------------+
                                     |
                                     v
                          Competitive Analysis
                                     |
                                     v
                      Recent Developments Analysis
                                     |
                                     v
                         Deterministic Scoring
                                     |
                                     v
                     Final Recommendation Generation
                                     |
                                     v
                           MongoDB Persistence
                                     |
                                     v
                         React Results Dashboard
```

## 5. How It Works

### Step 1: Company Input

The user enters the name of a publicly listed company.

### Step 2: Research Request Creation

The React frontend sends the company name to the Express backend.

The backend validates the input and creates a research document in MongoDB with an initial `pending` status.

### Step 3: Company Resolution

The workflow identifies the requested company and attempts to resolve useful metadata such as its canonical name, ticker, exchange, industry, country, and official website when available.

### Step 4: Source-Backed Research

The application collects relevant public information about the company using the configured research provider.

The research process focuses on:

* Business model
* Financial performance
* Growth opportunities
* Competitive position
* Recent developments
* Investment risks

Collected research evidence is normalized and deduplicated before being passed to the AI workflow.

### Step 5: AI Analysis

Google Gemini analyzes the collected evidence through focused analysis steps orchestrated using LangChain/LangGraph.

The workflow evaluates:

* Financial Health
* Growth Potential
* Competitive Position
* Risk Profile
* Recent Developments

The AI is instructed to analyze only the supplied evidence and avoid fabricating unsupported facts or sources.

### Step 6: Deterministic Scoring

The final investment score is calculated in application code instead of asking the LLM to calculate the final score.

The scoring weights are:

```text
Financial Health        30%
Growth Potential        25%
Competitive Position    20%
Risk Profile            15%
Recent Developments     10%
```

Formula:

```text
Overall Score =
(Financial Health × 0.30)
+ (Growth Potential × 0.25)
+ (Competitive Position × 0.20)
+ (Risk Profile × 0.15)
+ (Recent Developments × 0.10)
```

Recommendation thresholds:

```text
7.5 – 10.0  → INVEST

5.5 – 7.4   → WATCH

0.0 – 5.4   → PASS
```

A higher Risk Profile score represents lower investment risk and a safer investment profile.

### Step 7: Final Recommendation

Gemini generates an evidence-backed investment narrative using the validated analysis results and deterministic recommendation.

The AI cannot override the calculated overall score or final INVEST, WATCH, or PASS decision.

### Step 8: Persistence and Results

The completed research report is stored in MongoDB.

The frontend displays the structured investment report and allows completed reports to be reopened from the research history.

## 6. Project Structure

```text
InvestIQ-AI/

client/
    src/
        assets/
        components/
        pages/
        services/
        styles/
        App.jsx
        main.jsx
    .env.example
    package.json

server/
    src/
        config/
        controllers/
        graph/
            nodes/
        middleware/
        models/
        routes/
        services/
        tools/
        utils/
        app.js
        server.js
    .env.example
    package.json

docs/
    ai-chat-logs/
        README.md

screenshots/

README.md
```

The exact structure may vary slightly depending on the final implementation.

## 7. How to Run

### Prerequisites

Install:

* Node.js
* npm
* MongoDB Atlas account or local MongoDB instance
* Google Gemini API key
* Search/research provider API key used by the project

### Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd InvestIQ-AI
```

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory.

```env
PORT=5000
CLIENT_URL=http://localhost:5173

MONGODB_URI=your_mongodb_connection_string

GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash

TAVILY_API_KEY=your_tavily_api_key
```

Start the backend development server:

```bash
npm run dev
```

The backend should start on the configured `PORT`.

### Frontend Setup

Open another terminal.

```bash
cd client
npm install
```

Create a `.env` file inside the `client` directory.

```env
VITE_API_BASE_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Open the local URL displayed by Vite.

## 8. Environment Variables

### Server

| Variable         | Description                          |
| ---------------- | ------------------------------------ |
| `PORT`           | Backend server port                  |
| `CLIENT_URL`     | Allowed frontend origin              |
| `MONGODB_URI`    | MongoDB connection string            |
| `GEMINI_API_KEY` | Google Gemini API key                |
| `GEMINI_MODEL`   | Gemini model used for analysis       |
| `TAVILY_API_KEY` | Tavily API key used for web research |

### Client

| Variable            | Description                     |
| ------------------- | ------------------------------- |
| `VITE_API_BASE_URL` | Base URL of the Express backend |

Never commit real `.env` files or API keys to GitHub.

## 9. API Endpoints

| Method | Endpoint                    | Description                      |
| ------ | --------------------------- | -------------------------------- |
| GET    | `/api/health`               | Check backend server health      |
| POST   | `/api/research`             | Create a new research request    |
| GET    | `/api/research`             | Get recent research history      |
| GET    | `/api/research/:id`         | Get a complete research report   |
| POST   | `/api/research/:id/analyze` | Execute the AI research workflow |

## 10. Key Decisions and Trade-offs

### Source-Backed Research Before AI Analysis

Gemini is used as an analysis engine rather than as the source of current company facts.

Current information is collected from external sources before being passed to the model.

This reduces unsupported claims and makes the final recommendation more explainable.

### Deterministic Investment Scoring

The final overall score is calculated using application code.

This prevents the LLM from arbitrarily changing the scoring methodology and makes recommendations reproducible and easier to explain.

### Structured AI Responses

AI analysis nodes return structured data that is validated before being used by the application.

This simplifies frontend rendering and improves system reliability.

### LangGraph Workflow

LangGraph provides explicit orchestration of the research and analysis workflow.

Each step has a clear responsibility, making the system easier to debug, extend, and explain.

### MongoDB Persistence

Completed and failed research requests are stored in MongoDB.

This allows users to view previous analyses and prevents research history from disappearing after server restarts.

### No Authentication

Authentication was excluded to keep the assignment focused on AI workflow design, full-stack integration, research quality, and explainable recommendations.

### Limited Financial Data Precision

The application relies on public web research instead of a dedicated institutional financial market data provider.

A production-grade investment research platform would benefit from structured financial APIs and direct regulatory filing ingestion.

## 11. Example Runs

Add screenshots and results generated by the final working application.

### Microsoft

```text
Decision: Add actual application result
Overall Score: Add actual application result
Confidence: Add actual application result
```

Screenshot:

```text
screenshots/microsoft.png
```

### Tesla

```text
Decision: Add actual application result
Overall Score: Add actual application result
Confidence: Add actual application result
```

Screenshot:

```text
screenshots/tesla.png
```

### Coca-Cola

```text
Decision: Add actual application result
Overall Score: Add actual application result
Confidence: Add actual application result
```

Screenshot:

```text
screenshots/coca-cola.png
```

Do not add fabricated example results. Replace these placeholders only after running the completed application.

## 12. AI Usage During Development

AI coding tools and large language models were used throughout the development process as engineering assistants.

AI assistance was used for:

* Requirement analysis
* Architecture exploration
* Code generation assistance
* Debugging
* Prompt design
* LangGraph workflow planning
* Error handling improvements
* Testing guidance
* Documentation review

All generated code and architectural decisions were reviewed, tested, modified where necessary, and integrated into the final application.

The submitted implementation is intended to remain understandable and explainable during technical interviews.

## 13. LLM Chat Logs

The assignment encourages submission of development conversations with AI tools.

Actual development chat transcripts can be stored inside:

```text
docs/ai-chat-logs/
```

See:

```text
docs/ai-chat-logs/README.md
```

Only actual development conversations should be included.

No chat transcripts should be fabricated.

## 14. Limitations

* Investment recommendations depend on the quality and availability of public research sources.
* The application does not use institutional-grade real-time market data.
* Search API and Gemini API quotas may limit the number of analyses.
* The workflow may take time because multiple research and AI analysis steps are performed.
* Source credibility ranking is limited.
* The application does not perform detailed historical stock-price analysis.
* The application does not provide portfolio management.
* Research reports are not associated with authenticated user accounts.

## 15. What I Would Improve With More Time

* Integrate dedicated financial market data APIs.
* Add direct SEC and exchange filing ingestion.
* Parse annual reports and financial statement PDFs.
* Improve source credibility ranking.
* Add caching for repeated company research.
* Run long research workflows using background job queues.
* Add Server-Sent Events or streaming progress updates.
* Add user authentication and per-user research history.
* Add company comparison.
* Add watchlists.
* Add historical stock charts and technical indicators.
* Add automated AI evaluation datasets.
* Add prompt version tracking.
* Add observability and structured logging.
* Add API usage and cost controls.
* Add PDF investment report export.

## 16. Deployment

Recommended deployment architecture:

```text
React Frontend
→ Vercel

Express Backend
→ Render or Railway

MongoDB
→ MongoDB Atlas
```

Production environment variables must be configured on the selected hosting platforms.

Do not commit production credentials to the repository.

## 17. Disclaimer

AI-generated investment research for educational purposes only.

This application does not provide financial advice. Investment decisions should be made after conducting independent research and consulting qualified financial professionals when appropriate.
# InvestIQ-AI-Agent
