import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Loading from "../components/Loading";
import CompanyOverview from "../components/CompanyOverview";
import FinancialAnalysis from "../components/FinancialAnalysis";
import NewsAnalysis from "../components/NewsAnalysis";
import SWOT from "../components/SWOT";
import Recommendation from "../components/Recommendation";
import Footer from "../components/Footer";
import HistoryPanel from "../components/HistoryPanel";
import { analyzeCompany } from "../services/api";

const HISTORY_STORAGE_KEY = "ai-investment-history";

function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [historyItems, setHistoryItems] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY) || "[]");
      setHistoryItems(saved);
    } catch (err) {
      console.error("Unable to load history from local storage", err);
    }
  }, []);

  const persistHistory = (items) => {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(items));
    setHistoryItems(items);
  };

  const saveReportToHistory = (company, response) => {
    const trimmedCompany = company.trim();
    const item = {
      id: `${Date.now()}-${trimmedCompany}`,
      company: trimmedCompany,
      reportData: response,
      createdAt: new Date().toISOString(),
    };

    setHistoryItems((prev) => {
      const cleaned = prev.filter((entry) => entry.company.toLowerCase() !== trimmedCompany.toLowerCase());
      const next = [item, ...cleaned].slice(0, 12);
      persistHistory(next);
      return next;
    });
  };

  const handleSearch = async (company) => {
    setLoading(true);
    setError(false);
    setReportData(null);

    try {
      const response = await analyzeCompany(company);
      if (response.status === "success") {
        setReportData(response);
        saveReportToHistory(company, response);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const openHistoryItem = (item) => {
    setReportData(item.reportData);
    setError(false);
    setShowHistory(false);
  };

  return (
    <div className="min-h-screen flex flex-col text-slate-100">
      <Navbar onHistoryClick={() => setShowHistory(true)} historyCount={historyItems.length} />

      <main className="mx-auto flex w-full max-w-[1200px] flex-grow px-6 py-10">
        <div className="w-full">
          {!reportData && !loading && (
            <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/60 px-6 py-10 shadow-[0_30px_120px_rgba(6,10,20,0.85)] md:px-10 md:py-12">
              <div className="absolute -left-10 top-0 h-44 w-44 rounded-full bg-cyan-400/20 blur-3xl"></div>
              <div className="absolute right-0 top-10 h-52 w-52 rounded-full bg-violet-500/20 blur-3xl"></div>

              <div className="relative grid items-center gap-8 lg:grid-cols-[1.15fr,0.85fr]">
                <div>
                  <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-cyan-100">
                    Realtime Market Intelligence
                  </span>
                  <h2 className="mt-4 text-4xl font-black tracking-tight text-white md:text-5xl">
                    Analyze any company in seconds.
                  </h2>
                  <p className="mt-4 max-w-2xl text-lg text-slate-300">
                    Search a company name or ticker to unlock AI-powered financial, news, and SWOT insights.
                  </p>
                </div>

                <div className="rounded-[28px] border border-white/10 bg-slate-950/70 p-5 backdrop-blur-md">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-cyan-400/10 p-4">
                      <p className="text-xs uppercase tracking-[0.28em] text-cyan-200">Signal</p>
                      <p className="mt-2 text-2xl font-bold text-white">AI</p>
                    </div>
                    <div className="rounded-2xl bg-violet-500/10 p-4">
                      <p className="text-xs uppercase tracking-[0.28em] text-violet-200">Coverage</p>
                      <p className="mt-2 text-2xl font-bold text-white">Live</p>
                    </div>
                    <div className="rounded-2xl bg-emerald-500/10 p-4 sm:col-span-2">
                      <p className="text-xs uppercase tracking-[0.28em] text-emerald-200">Output</p>
                      <p className="mt-2 text-base text-slate-100">Investment recommendation, financial scorecards, and source-backed news analysis.</p>
                    </div>
                  </div>
                </div>
              </div>

              <SearchBar onSearch={handleSearch} isLoading={loading} />
            </section>
          )}

          {!reportData && !loading && !error && (
            <div className="mt-6 rounded-[24px] border border-white/10 bg-slate-900/45 p-4 text-sm text-slate-300 backdrop-blur">
              Tip: try names like Microsoft, NVIDIA, Tesla, or Samsung.
            </div>
          )}

          {error && (
            <div className="mt-8 rounded-[24px] border border-rose-400/30 bg-rose-500/10 p-6 text-center text-rose-100">
              <p className="text-lg font-semibold">Unable to generate report.</p>
              <p className="mt-2 text-sm text-rose-200">Please try again with a valid company name.</p>
            </div>
          )}

          {loading && <Loading />}

          {reportData && !loading && (
            <div className="mt-8 space-y-6">
              <Recommendation
                recommendation={reportData.aiGeneratedReport.recommendation}
                confidence={reportData.aiGeneratedReport.confidence}
                reasoning={reportData.aiGeneratedReport.reasoning}
              />

              <CompanyOverview
                data={reportData.aiGeneratedReport.companyOverview}
                companyName={reportData.researchData?.company?.shortName || reportData.metadata?.requestedCompany}
              />

              <FinancialAnalysis
                data={reportData.aiGeneratedReport.financialAnalysis}
              />

              <NewsAnalysis
                data={reportData.aiGeneratedReport.newsAnalysis}
              />

              <SWOT
                strengths={reportData.aiGeneratedReport.strengths}
                weaknesses={reportData.aiGeneratedReport.weaknesses}
                opportunities={reportData.aiGeneratedReport.opportunities}
                risks={reportData.aiGeneratedReport.risks}
              />
            </div>
          )}
        </div>
      </main>

      {showHistory && (
        <HistoryPanel
          items={historyItems}
          onClose={() => setShowHistory(false)}
          onOpenItem={openHistoryItem}
        />
      )}

      <Footer />
    </div>
  );
}

export default Home;