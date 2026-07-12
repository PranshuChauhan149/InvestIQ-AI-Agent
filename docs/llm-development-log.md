# LLM Development Log

This document serves as the development log for the AI Investment Research Agent, capturing the iterative process, design discussions, and key technical decisions made collaboratively during the project.

## 1. Project Planning
The initial phase focused on defining the core value proposition of the agent: providing structured, AI-driven investment recommendations based on real-time data. We established that the agent should not just blindly return data, but instead synthesize financial metrics, company overviews, and recent news into a clear "Invest" or "Pass" recommendation.

**Key Decisions:**
- Exclude live streaming prices and technical charting to maintain a focused scope on fundamental and AI sentiment analysis.
- Use a split frontend/backend architecture to keep API keys secure and allow for horizontal scaling of the backend services.

## 2. Architecture Discussion
We debated the optimal flow of data from the moment a user searches for a company to the final rendered report. 

**Flow Established:**
1. The React frontend sends a search query.
2. The Express backend orchestrates the data gathering.
3. Multiple discrete services fetch raw data in parallel.
4. Data is aggregated into a single `Research Object`.
5. The LangChain pipeline feeds the object to the Gemini model.
6. The frontend renders the structured JSON response.

## 3. Backend Design
To prevent monolithic design, we enforced a strict separation of concerns within the backend.

**Service Modules Created:**
- `companyService.js`: Interacts with Wikidata to get CEO, industry, and descriptions.
- `financeService.js`: Uses Yahoo Finance to pull PE ratios, EPS, and market cap.
- `newsService.js`: Fetches the latest top headlines via NewsAPI.
- `reportService.js`: Acts as the orchestrator that calls the data services, checks the cache, and invokes the AI service.

**Database & Caching (MongoDB):**
Initially, we used an in-memory `Map` for caching reports. However, recognizing that cloud hosts (like Render) spin down inactive instances causing in-memory data loss, we migrated the caching layer to MongoDB Atlas. This ensures reports survive cold starts and significantly reduces API quota usage.

## 4. LangChain Integration
Rather than using the raw Google Gemini SDK, we integrated LangChain. LangChain provided a robust framework for constructing the prompt pipeline and, crucially, managing the output format.

**Implementation Details:**
- Utilized `@langchain/google-genai` to initialize the `ChatGoogleGenerativeAI` model (`gemini-1.5-flash`).
- Used `PromptTemplate` to dynamically inject the gathered company, finance, and news JSON data into the system prompt.

## 5. Prompt Engineering
Crafting the prompt was an iterative process. Initially, the model would aggressively recommend "Pass" if any single financial metric (like PE Ratio or Net Income) was missing.

**Refinements:**
- *Original Behavior*: Missing data -> Recommend Pass.
- *Updated Instruction*: "If essential financial metrics are unavailable, mention that confidence is reduced. Do not automatically reject the company solely because of missing data."
- This refinement produced much more balanced, nuanced recommendations rather than binary rejections.

## 6. Structured Output
To ensure the React frontend could predictably render the complex analysis, we needed strict output formatting.

**Solution:**
- Defined an exact `InvestmentReportSchema` using `zod`.
- Used LangChain's `.withStructuredOutput(schema)` method to force the Gemini model to return a valid JSON object matching our schema.
- This eliminated the need for complex Regex parsing or dealing with hallucinated markdown formatting in the UI, allowing us to map directly to our component props (e.g., `report.companyOverview`, `report.financialAnalysis`, `report.swot`).

## 7. Frontend Planning
For the UI, we aimed for a clean, premium, and professional aesthetic heavily inspired by modern financial dashboards.

**Design Constraints Enforced:**
- Stack: React 19, Vite, Tailwind CSS.
- Styling: Minimalist, white backgrounds, gray borders (`border-gray-200`), blue accents (`blue-600`), and clean rounded corners. No heavy gradients or distracting animations.
- Component Architecture: Strict functional components with hook-based state management in `Home.jsx`. 
- Split the monolithic report into modular cards: `CompanyOverview`, `FinancialAnalysis`, `NewsAnalysis`, `SWOT`, and a high-contrast `Recommendation` card.
