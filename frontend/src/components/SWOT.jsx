import React from 'react';

const SWOT = ({ strengths, weaknesses, opportunities, risks }) => {
  return (
    <section className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6 shadow-[0_18px_70px_rgba(15,23,42,0.7)] backdrop-blur md:p-7">
      <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-3">
        <h2 className="text-2xl font-bold text-white">SWOT Analysis</h2>
        <span className="rounded-full border border-violet-400/30 bg-violet-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-violet-100">
          Overview
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-5">
          <h3 className="mb-3 border-b border-emerald-400/20 pb-2 text-lg font-bold text-emerald-200">Strengths</h3>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-100">
            {strengths?.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>

        <div className="rounded-2xl border border-rose-400/20 bg-rose-500/10 p-5">
          <h3 className="mb-3 border-b border-rose-400/20 pb-2 text-lg font-bold text-rose-200">Weaknesses</h3>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-100">
            {weaknesses?.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>

        <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-5">
          <h3 className="mb-3 border-b border-cyan-400/20 pb-2 text-lg font-bold text-cyan-200">Opportunities</h3>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-100">
            {opportunities?.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>

        <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 p-5">
          <h3 className="mb-3 border-b border-amber-400/20 pb-2 text-lg font-bold text-amber-200">Risks</h3>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-100">
            {risks?.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default SWOT;
