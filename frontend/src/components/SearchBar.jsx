import { useState } from "react";

const SearchBar = ({ onSearch, isLoading }) => {
  const [company, setCompany] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!company.trim() || isLoading) return;
    onSearch(company);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-8 w-full max-w-4xl rounded-[28px] border border-white/10 bg-slate-900/70 p-3 shadow-[0_20px_80px_rgba(15,23,42,0.55)] backdrop-blur"
    >
      <div className="flex flex-col gap-3 md:flex-row">
        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Enter company name or ticker..."
          disabled={isLoading}
          className="w-full flex-1 rounded-2xl border border-white/10 bg-slate-950/70 px-5 py-4 text-base text-slate-100 placeholder:text-slate-400 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40 disabled:cursor-not-allowed disabled:bg-slate-900 disabled:text-slate-500"
        />

        <button
          disabled={isLoading}
          className="rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-4 text-sm font-bold uppercase tracking-[0.24em] text-slate-950 shadow-lg shadow-cyan-500/30 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
        >
          Analyze
        </button>
      </div>
    </form>
  );
};

export default SearchBar;