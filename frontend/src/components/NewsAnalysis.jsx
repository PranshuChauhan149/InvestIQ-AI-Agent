import React from 'react';

const NewsAnalysis = ({ data }) => {
  if (!data) return null;

  const sentimentStyles = {
    Positive: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200',
    Neutral: 'border-slate-400/30 bg-slate-400/10 text-slate-100',
    Negative: 'border-rose-400/30 bg-rose-400/10 text-rose-200',
  };

  return (
    <section className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6 shadow-[0_18px_70px_rgba(15,23,42,0.7)] backdrop-blur md:p-7">
      <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-3">
        <h2 className="text-2xl font-bold text-white">News Analysis</h2>
        <span className={`rounded-full border px-3 py-1 text-sm font-bold ${sentimentStyles[data.sentiment] || 'border-white/10 bg-slate-800 text-slate-100'}`}>
          {data.sentiment}
        </span>
      </div>

      <div className="mb-5 rounded-2xl border border-white/10 bg-slate-950/60 p-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Summary</p>
        <p className="text-slate-200 leading-7">{data.summary}</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Key Events</p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {data.keyEvents?.map((event, index) => (
            <div key={index} className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
              <p className="text-sm leading-6 text-slate-200">{event}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsAnalysis;
