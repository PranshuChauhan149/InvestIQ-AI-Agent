import React from 'react';

const CompanyOverview = ({ data, companyName }) => {
  if (!data) return null;

  return (
    <section className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6 shadow-[0_18px_70px_rgba(15,23,42,0.7)] backdrop-blur md:p-7">
      <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-3">
        <h2 className="text-2xl font-bold text-white">Company Overview</h2>
        <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-100">
          Profile
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Company Name</p>
          <p className="mt-2 text-lg font-semibold text-white">{companyName || 'N/A'}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Industry</p>
          <p className="mt-2 text-lg font-semibold text-white">{data.industry || 'N/A'}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">CEO</p>
          <p className="mt-2 text-lg font-semibold text-white">{data.ceo || 'N/A'}</p>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/60 p-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Summary</p>
        <p className="text-slate-200 leading-7">{data.summary || 'N/A'}</p>
      </div>
    </section>
  );
};

export default CompanyOverview;
